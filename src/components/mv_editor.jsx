var MVEvent = MVEvent || {};
MVEvent.DEF_CHANGED = "modelDefChanged";
MVEvent.MODEL_CHANGED = "modelChanged";

window.ModelEditor = React.createClass({

    getInitialState: function () {
        return {
            selectedModel: {},
            selectedModelDef: {},
            allDefs: {}
        };
    },

    componentDidMount: function () {
        var self = this;

        function contains(a, obj) {
            for (var i = 0; i < a.length; i++) {
                if (a[i] === obj) {
                    return true;
                }
            }
            return false;
        }

        $(document).on(MVEvent.MODEL_CHANGED, function (event, newModel) {
            var type = newModel.__type,
                def = self.state.allDefs[type];
            self.setState($.extend(this.state, {selectedModel: newModel, selectedModelDef: def}));
        });
        $(document).on(MVEvent.DEF_CHANGED, function (event, selectedModelDef, relatedTypes, modelDefs, allDefs) {
            self.setState($.extend(this.state, {allDefs: allDefs}));
        });
    },

    render: function () {
        console.log("Render editor", this.state);

        return (
            <div id="modelEditor">

            </div>
        );
    }
});
