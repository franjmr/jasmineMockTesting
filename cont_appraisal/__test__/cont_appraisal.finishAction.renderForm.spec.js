if(window.require){
    require("./lib/jasmine-3.5.0/jasmine");
    require("../cont_appraisal");
}

describe("Continuous Appraisal - Finish Action Render Form (Suite)", function () {
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


    it("should render two buttons in the finish action form", function () {
        meta4.cont_appraisal.cont_appraisal_ess.__test__only__.finishAction(1);
        expect(mock_widgetForm).toHaveBeenCalled();
        expect(mock_widgetButton).toHaveBeenCalledTimes(2);
        expect(mock_widgetForm.prototype.addButtons).toHaveBeenCalledTimes(2);
    });

    it("should render a primary button to save finish action form", function () {
        meta4.cont_appraisal.cont_appraisal_ess.__test__only__.finishAction(1);
        var saveButtonConstructorArgs = mock_widgetButton.calls.argsFor(0);
        var saveButtonTranslate = saveButtonConstructorArgs[0];
        var saveButtonOptions = saveButtonConstructorArgs[2];
        expect(saveButtonTranslate).toEqual("_saveFinish");
        expect(saveButtonOptions).toEqual(jasmine.objectContaining({id: "btnCancelPaintForm"}));
        expect(saveButtonOptions).toEqual(jasmine.objectContaining({typeButton: "primary"}));
    });

    it("should render a secondary button to cancel finish action form", function () {
        meta4.cont_appraisal.cont_appraisal_ess.__test__only__.finishAction(1);
        var cancelButtonConstructorArgs = mock_widgetButton.calls.argsFor(1);
        var cancelButtonTranslate = cancelButtonConstructorArgs[0];
        var cancelButtonOptions = cancelButtonConstructorArgs[2];
        expect(cancelButtonTranslate).toEqual("_close");
        expect(cancelButtonOptions).toEqual(jasmine.objectContaining({id: "btnCancelPaintForm"}));
        expect(cancelButtonOptions).toEqual(jasmine.objectContaining({typeButton: "secondary"}));
    });

    it("should primary button trigger event click", function () {
        meta4.cont_appraisal.cont_appraisal_ess.__test__only__.finishAction(1);
        var saveButtonConstructorArgs = mock_widgetButton.calls.argsFor(0);
        var saveButtonOptions = saveButtonConstructorArgs[2];
        var saveButtonEvents = saveButtonOptions.events;
        var saveButtonEventClick = saveButtonEvents.click;
        expect(saveButtonEvents).toBeTruthy();
        expect(saveButtonEventClick).toBeTruthy();
        expect(saveButtonEventClick).toEqual(jasmine.objectContaining({name: "click"}));
        expect(typeof saveButtonEventClick).toBe("function")
    });

    it("should secondary button trigger event click", function () {
        meta4.cont_appraisal.cont_appraisal_ess.__test__only__.finishAction(1);
        var cancelButtonConstructorArgs = mock_widgetButton.calls.argsFor(1);
        var cancelButtonOptions = cancelButtonConstructorArgs[2];
        var cancelButtonEvents = cancelButtonOptions.events;
        var cancelButtonEventClick = cancelButtonEvents.click;
        expect(cancelButtonEvents).toBeTruthy();
        expect(cancelButtonEventClick).toBeTruthy();
        expect(cancelButtonEventClick).toEqual(jasmine.objectContaining({name: "click"}));
        expect(typeof cancelButtonEventClick).toBe("function")
    });
});
