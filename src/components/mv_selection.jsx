var MVEvent = MVEvent || {};
MVEvent.DEF_CHANGED = "modelDefChanged";

window.ModelSelect = React.createClass({

    getInitialState: function () {
        return {
            modelDefs: {},
            selectedModelDef: {},
            options: []
        }
    },

    componentDidMount: function () {
        var target = "/service/org.snodes.core.service.graph.GraphService.getBaseModelDefs",
            postBody = [];
        this.serverRequest = $.ajax({
            url: target,
            data: postBody,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: this.successHandler
        });
    },

    componentWillUnmount: function () {
        if (this.serverRequest)
            this.serverRequest.abort();
    },

    change: function (event) {

        var self = this;

        function contains(a, obj) {
            for (var i = 0; i < a.length; i++) {
                if (a[i] === obj) {
                    return true;
                }
            }
            return false;
        }

        function findChildTypes(relatedTypes, targetType, modelDefs) {
            relatedTypes.push(targetType);
            for (var defType in modelDefs) {
                var def = modelDefs[defType];
                if (def.superTypes && contains(def.superTypes, targetType) && !contains(relatedTypes, def.type)) {
                    findChildTypes(relatedTypes, def.type, modelDefs);
                }
            }
        }

        var newState = $.extend({}, this.state),
            targetType = event.target.value,
            allDefs = newState.modelDefs,
            relatedTypes = [];

        for (var defType in allDefs) {
            if (defType === targetType) {
                newState.selectedModelDef = allDefs[defType];
            }
        }
        findChildTypes(relatedTypes, targetType, this.state.modelDefs);
        this.setState(newState);
        console.log(relatedTypes);
        $(document).trigger(MVEvent.DEF_CHANGED, [newState.selectedModelDef, relatedTypes, this.state.modelDefs, allDefs]);
    },

    successHandler: function (data) {
        var results = data.result.value,
            modeDefs = this.state.modelDefs = {};
        for (var i = 0; i < results.length; i++) {
            var type = results[i].value.type;
            this.state.options.push(
                <option key={i} value={type}>{type}</option>
            );
            modeDefs[type] = results[i].value;
        }
        this.forceUpdate();
    },

    render: function () {
        return (
            <select onChange={this.change} value={this.state.selectedModelDef.type}>{this.state.options}</select>
        )
    }
});