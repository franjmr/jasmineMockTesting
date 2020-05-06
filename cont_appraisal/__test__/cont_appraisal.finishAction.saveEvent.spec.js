if(window.require){
    require("../../__lib__/jasmine-3.5.0/jasmine");
    require("../cont_appraisal");
}

describe("Continuous Appraisal - Finish Action Save Event (Suite)", function () {
    var mock_widgetForm;
    var mock_widgetButton;
    var mock_M4Request;

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
        mock_M4Request = jasmine.createSpy('M4Request');
        meta4.M4Request = mock_M4Request

        var mock_m4object = jasmine.createSpyObj('m4Object', {
            'getNode': jasmine.createSpyObj('m4Node', ['moveTo', 'getCurrent'])
        });

        meta4.cont_appraisal.cont_appraisal_ess.__test__only__._setM4Object_PlcoCpMtHrRole(mock_m4object);
        meta4.cont_appraisal.cont_appraisal_ess.__test__only__._setNode_PlcoCpHrActivities();

        // META4.DATA
        meta4.data = {}
        meta4.data.execute = jasmine.createSpy('m4dataexec');

    });

    it("should primary button click event execute request", function () {
        meta4.cont_appraisal.cont_appraisal_ess.__test__only__.finishAction(1);
        var saveButtonConstructorArgs = mock_widgetButton.calls.argsFor(0);
        var saveButtonOptions = saveButtonConstructorArgs[2];
        var saveButtonEvents = saveButtonOptions.events;
        var saveButtonEventClick = saveButtonEvents.click;
        saveButtonEventClick();
        var m4NodeActivities = meta4.cont_appraisal.cont_appraisal_ess.__test__only__._getNode_PlcoCpHrActivities();
        expect(m4NodeActivities.getCurrent).toHaveBeenCalled();
        expect(meta4.M4Request).toHaveBeenCalledWith(jasmine.any(Object), 'PLCO_CP_HR_ACTIVITIES', 'PLCO_FINISH', null);
        expect(meta4.data.execute).toHaveBeenCalledWith(jasmine.any(Object), jasmine.any(Function));
    });
});
