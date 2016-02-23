var Table = Reactable.Table;
var ModelEditor = window.ModelEditor;
var ModelSelect = window.ModelSelect;

var MVEvent = MVEvent || {};
MVEvent.DEF_CHANGED = "modelDefChanged";
MVEvent.MODEL_CHANGED = "modelChanged";

window.ModelViewer = React.createClass({

    getInitialState: function () {
        return {
            relatedTypes: [],
            modelsForPage: [],
            from: 0,
            size: 5
        };
    },

    componentDidUpdate: function () {
        this.addRowClickListeners();
    },

    addRowClickListeners: function () {
        var self = this;
        $('#modelTable').find("tr").off().on("click", function (event, data) {
            var idNode = $(this).find("[label='id']")[0],
                typeNode = $(this).find("[label='type']")[0];
            if (!idNode || !typeNode)
                return;
            var modelId = idNode.textContent,
                modelType = typeNode.textContent;
            var target = "/service/org.snodes.core.service.graph.GraphService.getObject",
                postBody = [{
                    "type": "java.lang.String",
                    "value": modelId
                }, {
                    "type": "java.lang.Class",
                    "value": modelType
                }
                ];
            self.serverRequest = $.ajax({
                url: target,
                data: JSON.stringify(postBody),
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function (data) {
                    var model = data.result.value;
                    $(document).trigger(MVEvent.MODEL_CHANGED, [model]);
                }
            });
        });
    },

    onPageChange: function (newPage) {
        var from = Math.round(newPage * this.state.size);
        this.updateTable(from, this.state.size);
    },

    componentDidMount: function () {
        var self = this;
        $(document).on(MVEvent.DEF_CHANGED, function (event, selectedModelDef, relatedTypes) {
            self.state.relatedTypes = relatedTypes;
            self.updateTable(0, self.state.size);
        });
    },

    updateTable: function (from, size) {
        var self = this;
        var target = "/service/org.snodes.index.api.IndexService.search",
            postBody = [{
                "type": "java.lang.String",
                "value": "model"
            }, {
                "type": "java.util.List",
                "value": this.state.relatedTypes
            }, {
                "type": "io.vertx.core.json.JsonObject",
                "value": {"from": from, "size": size}
            }
            ];
        this.serverRequest = $.ajax({
            url: target,
            data: JSON.stringify(postBody),
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (data) {
                self.setModelsForPage(data, from, size);
            }
        });
    },

    setModelsForPage: function (data, from, size) {
        var models = data.result.value.hits.hits,
            total = data.result.value.hits.total,
            modelsForPage = [];
        for (var i = 0; i < total; i++) {
            modelsForPage.push({});
        }
        for (i = 0; i < models.length; i++) {
            var _model = models[i],
                model = {'id': _model._id, 'type': _model._type};
            for (var key in _model._source) {
                model[key] = _model._source[key];
            }
            modelsForPage[i + from] = model;
        }
        this.setState({
            relatedTypes: this.state.relatedTypes,
            modelsForPage: modelsForPage,
            from: from,
            size: size
        });
    },

    componentWillUnmount: function () {
        if (this.serverRequest)
            this.serverRequest.abort();
    },

    render: function () {
        var page = Math.round(this.state.from / this.state.size);
        return (
            <div>
                <ModelSelect/>
                <Table id="modelTable" currentPage={page} itemsPerPage={this.state.size} pageButtonLimit={5}
                       onPageChange={this.onPageChange}
                       data={this.state.modelsForPage}/>
                <ModelEditor />
            </div>
        );
    }
});