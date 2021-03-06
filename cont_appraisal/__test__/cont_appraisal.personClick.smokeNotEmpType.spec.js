if(window.require){
    require("../../__lib__/jasmine-3.5.0/jasmine");
    require("../cont_appraisal");
}

describe("Continuous Appraisal - Person Click Smoke Not Employe Type (Suite)", function () {
    var mock_M4Request;
    var mock_M4Object;
    var mock_M4ObjectInstance;

    beforeEach(function () {
        //Clear old values
        meta4.cont_appraisal.cont_appraisal_ess.__test__only__._clearPrivateAttributes();

        // Mock meta4.m4jsapi
        mock_M4Request = jasmine.createSpy('M4Request');
        mock_M4Request.prototype.addReference = jasmine.createSpy('addReference');

        mock_M4Object = jasmine.createSpy('M4Object');
        mock_M4ObjectInstance = jasmine.createSpyObj("m4Object",['getNode','moveTo','isDeleted']);

        meta4.M4Request = mock_M4Request;
        meta4.M4Object = mock_M4Object;
        meta4.cont_appraisal.cont_appraisal_ess.__test__only__._setM4Object_PlcoCpMtHrRole(mock_M4ObjectInstance);

        // Mock meta4.data
        function mock_dataGetValue(node,item){
            if(item === "PLCO_EMP_TYPE"){
                return "0";
            }
            return "1";
        }

        meta4.data = {}
        meta4.data.utils = {};
        meta4.data.utils.getValue = jasmine.createSpy('m4dataGetValue').and.callFake(mock_dataGetValue);
        meta4.data.execute = jasmine.createSpy('m4DataExec');
    });

    it("should not throws an exception", function () {
        var personClick = meta4.cont_appraisal.cont_appraisal_ess.__test__only__.personClick;
        expect(personClick).not.toThrow();
    });

    it("should create three M4Objects instances", function () {
        meta4.cont_appraisal.cont_appraisal_ess.__test__only__.personClick();
        expect(mock_M4Object).toHaveBeenCalledTimes(3);
        expect(mock_M4Object.calls.argsFor(0)).toEqual(['PLCO_CP_MT_KNOW_MAP', 'PLCO_CP_MT_KNOW_MAP']);
        expect(mock_M4Object.calls.argsFor(1)).toEqual(['PLCO_CP_MT_OBJ_CUAN', 'PLCO_CP_MT_OBJ_CUAN']);
        expect(mock_M4Object.calls.argsFor(2)).toEqual(['PLCO_CP_MT_OBJ_CUALI', 'PLCO_CP_MT_OBJ_CUALI']);
    });

    it("should create a single M4Request instance", function () {
        meta4.cont_appraisal.cont_appraisal_ess.__test__only__.personClick();
        expect(mock_M4Request).toHaveBeenCalledTimes(1);
        expect(meta4.M4Request).toHaveBeenCalledWith(jasmine.any(Object), 'PLCO_CP_MT_HR_ROLE', 'PLCO_LOAD_ACTIVITY', null);
    });

    it("should add three references into M4Request", function () {
        meta4.cont_appraisal.cont_appraisal_ess.__test__only__.personClick();
        expect(mock_M4Request.prototype.addReference).toHaveBeenCalledTimes(3);
        expect(mock_M4Request.prototype.addReference.calls.argsFor(0)).toEqual(['PLCO_CP_MT_KNOW_MAP', jasmine.any(Object)]);
        expect(mock_M4Request.prototype.addReference.calls.argsFor(1)).toEqual(['PLCO_CP_MT_OBJ_CUAN', jasmine.any(Object)]);
        expect(mock_M4Request.prototype.addReference.calls.argsFor(2)).toEqual(['PLCO_CP_MT_OBJ_CUALI', jasmine.any(Object)]);
    });

    it("should execute a M4Request instance", function () {
        meta4.cont_appraisal.cont_appraisal_ess.__test__only__.personClick();
        expect(meta4.data.execute).toHaveBeenCalledWith(jasmine.any(Object), jasmine.any(Function));
    });

    it("should not initialize m4objects again if the instances already exist", function(){
        var personClickFirstCall = meta4.cont_appraisal.cont_appraisal_ess.__test__only__.personClick;
        var personClickSecondCall = meta4.cont_appraisal.cont_appraisal_ess.__test__only__.personClick;
        expect(personClickFirstCall).not.toThrow();
        expect(personClickSecondCall).not.toThrow();
        expect(mock_M4Object).toHaveBeenCalledTimes(3);
    });

});
