if(window.require){
    require("../../__lib__/jasmine-3.5.0/jasmine");
    require("../automation");
}

describe("Automation - Employee: Load Employee Activity (Suite)", function () {
    var mock_M4RequestConstructor;
    var mock_M4ObjectConstructor;
    var mock_M4ObjectInstance;
    var mock_M4ObjectInstance2;
    var mock_M4RequestInstance;
    var mock_M4NodeInstance;

    beforeEach(function () {
        //M4JSAPI Objects
        mock_M4Node = jasmine.createSpy('M4Node');
        mock_M4Object_arg = jasmine.createSpyObj("M4ObjectArg",{
            'getNode': mock_M4Node
        });

        mock_M4Object_ref = jasmine.createSpyObj("M4RequestRef",['getNode']);
        mock_M4Request = jasmine.createSpyObj("M4Request",['addReference']);
        
        //M4JSAPI lib
        mock_M4RequestApi = jasmine.createSpy('M4Request_Api').and.returnValue(mock_M4Request);
        mock_M4ObjectApi = jasmine.createSpy('M4Object_Api').and.returnValue(mock_M4Object_ref);

        meta4.M4Request = mock_M4RequestApi;
        meta4.M4Object = mock_M4ObjectApi;

        //Meta4 Data Lib
        meta4.data = {}
        meta4.data.utils = {};
        meta4.data.utils.getValue = jasmine.createSpy('m4dataGetValue').and.returnValue(false);
        meta4.data.execute = jasmine.createSpy('m4DataExec');
    });

    it("should create M4Request to load employee activity", function () {
        meta4.automation.employee.loadEmployeeActivity(mock_M4Object_arg);
        expect(mock_M4RequestApi).toHaveBeenCalledWith(mock_M4Object_arg, 'MY_ACTIVITY_M4NODE', 'LOAD_ACTIVITY', null);
    });

    it("should get node property value to identify employee type", function () {
        meta4.automation.employee.loadEmployeeActivity(mock_M4Object_arg);
        expect(mock_M4Object_arg.getNode).toHaveBeenCalledWith('MY_ACTIVITY_M4NODE');
        expect(meta4.data.utils.getValue).toHaveBeenCalledWith(mock_M4Node,'PROP_IS_MANAGER');
    });

    it("Should not add request references when load non-manager employee", function () {
        meta4.data.utils.getValue = jasmine.createSpy('m4dataGetValue').and.returnValue(false);
        meta4.automation.employee.loadEmployeeActivity(mock_M4Object_arg);
        expect(mock_M4Request.addReference).not.toHaveBeenCalled();
    });

    it("Should add request references when load manager employee", function () {
        meta4.data.utils.getValue = jasmine.createSpy('m4dataGetValue').and.returnValue(true);
        meta4.automation.employee.loadEmployeeActivity(mock_M4Object_arg);
        expect(mock_M4Request.addReference).toHaveBeenCalled();
    });

    it("Should create M4Object instance to add this as request reference.", function () {
        meta4.data.utils.getValue = jasmine.createSpy('m4dataGetValue').and.returnValue(true);
        meta4.automation.employee.loadEmployeeActivity(mock_M4Object_arg);
        expect(mock_M4ObjectApi).toHaveBeenCalledWith('PLCO_MY_REFERENCE_M4O', 'PLCO_MY_REFERENCE_M4O');
        expect(mock_M4Request.addReference).toHaveBeenCalledWith('PLCO_MY_REFERENCE', mock_M4Object_ref);
    });

    it("Should execute request with a callback", function () {
        meta4.data.utils.getValue = jasmine.createSpy('m4dataGetValue').and.returnValue(false);
        meta4.automation.employee.loadEmployeeActivity(mock_M4Object_arg);
        expect(meta4.data.execute).toHaveBeenCalledWith(mock_M4Request,jasmine.any(Function));
    });

});
