if(window.require){
    require("../../__lib__/jasmine-3.5.0/jasmine");
    require("../cont_appraisal");
}

describe("Continuous Appraisal - createButtonsActions (Suite)", function () {

    var SHOW = 1;
    var HIDEN = 0;

    beforeAll(function () {
        function getTranslateMock(id){
            return id;
        }

        meta4.widget = {}
        meta4.widget.translate = {};
        meta4.widget.icons = {};
        meta4.widget.translate.getTranslate = null;
        meta4.widget.icons.edit = "edit"
        meta4.widget.icons.delete_c = "delete_c"
        meta4.widget.icons.bubble_pencil_ln = "bubble_pencil_ln"
        meta4.widget.icons.stack_cancel = "stack_cancel"
        meta4.widget.icons.finish = "finish"
        meta4.widget.icons.users_group = "users_group"

        spyOn(meta4.widget.translate,"getTranslate").and.callFake(getTranslateMock);
    });

    it("should create all action buttons", function () {
        var m4NodeCurrent = 1;
        var showValues = {
            showbtnAddFeedback: SHOW,
            showFinish: SHOW,
            showCancel: SHOW,
            showDelete: SHOW,
            showAsk: SHOW,
            showEdit: SHOW
        }
        var buttonActions = meta4.cont_appraisal.cont_appraisal_ess.__test__only__.createButtonsActions(m4NodeCurrent, showValues);
        expect(buttonActions.length).toEqual(6);
    });

    it("should create Add Feedback button only", function () {
        var m4NodeCurrent = 1;
        var showValues = {
            showbtnAddFeedback: SHOW,
            showFinish: HIDEN,
            showCancel: HIDEN,
            showDelete: HIDEN,
            showAsk: HIDEN,
            showEdit: HIDEN
        }
        var buttonActions = meta4.cont_appraisal.cont_appraisal_ess.__test__only__.createButtonsActions(m4NodeCurrent, showValues);
        var addFeebackButton = buttonActions[0];
        expect(buttonActions.length).toEqual(1);
        expect(addFeebackButton).toBeTruthy();
        expect(addFeebackButton.id).toEqual("buttonFeedback_1");
        expect(addFeebackButton.title).toEqual("_btnFeedback");
        expect(typeof addFeebackButton.functionClick).toBe("function");
        expect(addFeebackButton.functionClick).toBeDefined();
        expect(addFeebackButton.button).toEqual(jasmine.objectContaining({icon: "bubble_pencil_ln"}));
        expect(addFeebackButton.button).toEqual(jasmine.objectContaining({text: "_btnFeedback"}));
    });
});
