if(window.require){
    require("../../__lib__/jasmine-3.5.0/jasmine");
    require("../cont_appraisal");
}

describe("Continuous Appraisal - Finish Action Smoke (Suite)", function () {
    var mock_widgetForm;
    var mock_widgetButton;

    beforeEach(function () {
        // Mootools Mock
        document.addEvent = jasmine.createSpy('mootools.addevent');

        // Jasmine Spy
        mock_widgetForm = jasmine.createSpy('form');
        mock_widgetButton = jasmine.createSpy('Button');

        mock_widgetForm.prototype.addButtons = null;
        spyOn(mock_widgetForm.prototype,'addButtons');

        // Mock Widget
        meta4.widget = {}
        meta4.widget.translate = {};
        meta4.widget.TypeElement = {};
        meta4.widget.icons = {};
        meta4.widget.TypeElement.comment = "comment";
        meta4.widget.translate.getTranslate = null;
        spyOn(meta4.widget.translate,"getTranslate").and.callFake(function(id){
            return id;
        });

        meta4.widget.Form = mock_widgetForm;
        meta4.widget.Button = mock_widgetButton;

        // meta4.m4jsapi
        var mock_m4object = jasmine.createSpyObj('m4Object', {
            'getNode': jasmine.createSpyObj('m4Node', ['moveTo', 'getCurrent'])
        });

        meta4.cont_appraisal.cont_appraisal_ess.__test__only__._setM4Object_PlcoCpMtHrRole(mock_m4object);
        meta4.cont_appraisal.cont_appraisal_ess.__test__only__._setNode_PlcoCpHrActivities();
    });

    it("should not throws an exception", function () {
        var finishAction = meta4.cont_appraisal.cont_appraisal_ess.__test__only__.finishAction;
        expect(finishAction).not.toThrow();
    });

    it("should be positioned on the node if an index is specified", function () {
        var idxPos = 1;
        meta4.cont_appraisal.cont_appraisal_ess.__test__only__.finishAction(idxPos);
        var m4NodeActivities = meta4.cont_appraisal.cont_appraisal_ess.__test__only__._getNode_PlcoCpHrActivities();
        expect(m4NodeActivities.moveTo).toHaveBeenCalledWith(1);
    });

    it("should not be positioned on the node if no index is specified", function () {
        meta4.cont_appraisal.cont_appraisal_ess.__test__only__.finishAction();
        var m4NodeActivities = meta4.cont_appraisal.cont_appraisal_ess.__test__only__._getNode_PlcoCpHrActivities();
        expect(m4NodeActivities.moveTo).not.toHaveBeenCalled();
    });
    
});
