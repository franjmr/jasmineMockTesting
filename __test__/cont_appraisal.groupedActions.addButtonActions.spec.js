if(window.require){
    require("./lib/jasmine-3.5.0/jasmine");
    require("../cont_appraisal");
}

describe("Continuous Appraisal - Add Button Actions in a container (Suite)", function () {

    var mock_GroupedActions = null

    beforeEach(function () {
        function getTranslateMock(id){
            return id;
        }

        meta4.widget = {}
        meta4.widget.translate = {};
        meta4.widget.translate.getTranslate = null;
        spyOn(meta4.widget.translate,"getTranslate").and.callFake(getTranslateMock);

        mock_GroupedActions = jasmine.createSpy('groupedActions');
        mock_GroupedActions.prototype.add = null;
        spyOn(mock_GroupedActions.prototype,'add');
        meta4.widget.GroupedActions = mock_GroupedActions;
    });

    it("should not add buttons actions in an empty continer", function () {
        var m4NodeCurrent = 1;
        var container = null;
        var buttonsAction = [];
        meta4.cont_appraisal.cont_appraisal_ess.__test__only__.addButtonActions(m4NodeCurrent, container, buttonsAction );
        expect(mock_GroupedActions).not.toHaveBeenCalled();
    });

    it("should add buttons actions in a GroupedActions component", function () {
        var m4NodeCurrent = 1;
        var container = document.createElement("div");
        var buttonsAction = ['mockButtonActionA','mockButtonActionB'];
        meta4.cont_appraisal.cont_appraisal_ess.__test__only__.addButtonActions(m4NodeCurrent, container, buttonsAction );
        expect(mock_GroupedActions).toHaveBeenCalled();
        expect(mock_GroupedActions.prototype.add).toHaveBeenCalledWith(buttonsAction);
    });

    it("should create GroupedActions with options", function () {
        var m4NodeCurrent = 1;
        var container = document.createElement("div");
        var buttonsAction = [];
        var groupedOptions = { id: 'groupedActionsMain_1', label: '_btnActions' };
        meta4.cont_appraisal.cont_appraisal_ess.__test__only__.addButtonActions(m4NodeCurrent, container, buttonsAction );
        expect(mock_GroupedActions).toHaveBeenCalledWith(container, groupedOptions)
    });

});
