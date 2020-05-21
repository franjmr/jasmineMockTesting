if(window.require){
    require("../../__lib__/jasmine-3.5.0/jasmine");
    require("../automationLegacy");
}

describe("Automation Legacy - Employee: Load Employee Detail (Suite)", function () {
    var mock_M4Node = null;
    var mock_M4Object = null;

    beforeEach(function () {
        mock_M4Node = jasmine.createSpyObj("mock_M4Node",['count','getValue','moveTo']);
        mock_M4Object= jasmine.createSpyObj("mock_M4Object",['getNode']);
    });

    it("should not throw Error with a public employe profile", function () {
        var privateProfile = 0;
        mock_M4Node.count = jasmine.createSpy('mock_nodeCount').and.returnValue(1);
        mock_M4Node.getValue = jasmine.createSpy('mock_nodeGetValue').and.returnValue(privateProfile);
        mock_M4Object.getNode = jasmine.createSpy('mock_m4oGetNode').and.returnValue(mock_M4Node);
        meta4.automationLegacy.employee.__testonly__._setM4Object(mock_M4Object);

        var testFunc = meta4.automationLegacy.employee.__testonly__._onLoadEmployeeDetailSuccess;
        expect(testFunc).not.toThrowError();
    });

    it("should load detail from a public employe profile", function () {
        function getValueMock(itemKey) {
            var values = {PROP_IS_PRIVATE: 0, PROP_ID: 'idvalue', PROP_NAME: 'nameValue', PROP_AGE: 36}
            return values[itemKey]
        }
        mock_M4Node.count = jasmine.createSpy('mock_nodeCount').and.returnValue(1);
        mock_M4Node.getValue = jasmine.createSpy('mock_nodeGetValue').and.callFake(getValueMock);
        mock_M4Object.getNode = jasmine.createSpy('mock_m4oGetNode').and.returnValue(mock_M4Node);
        meta4.automationLegacy.employee.__testonly__._setM4Object(mock_M4Object);

        meta4.automationLegacy.employee.__testonly__._onLoadEmployeeDetailSuccess();

        var empDetail = meta4.automationLegacy.employee.__testonly__._getEmpDetail();
        expect(empDetail).toBeTruthy();
        expect(empDetail).toEqual(jasmine.objectContaining({id: 'idvalue'}));
        expect(empDetail).toEqual(jasmine.objectContaining({name: 'nameValue'}));
        expect(empDetail).toEqual(jasmine.objectContaining({age: 36}));
    });

    it("should throw Error with a private employe profile", function () {
        var privateProfile = 1;
        mock_M4Node.count = jasmine.createSpy('mock_nodeCount').and.returnValue(1);
        mock_M4Node.getValue = jasmine.createSpy('mock_nodeGetValue').and.returnValue(privateProfile);
        mock_M4Object.getNode = jasmine.createSpy('mock_m4oGetNode').and.returnValue(mock_M4Node);
        meta4.automationLegacy.employee.__testonly__._setM4Object(mock_M4Object);

        var testFunc = meta4.automationLegacy.employee.__testonly__._onLoadEmployeeDetailSuccess;
        expect(testFunc).toThrowError();
    });

    it("should not load detail from a private employe profile", function () {
        function getValueMock(itemKey) {
            var values = {PROP_IS_PRIVATE: 1, PROP_ID: 'idvalue', PROP_NAME: 'nameValue', PROP_AGE: 36}
            return values[itemKey]
        }
        mock_M4Node.count = jasmine.createSpy('mock_nodeCount').and.returnValue(1);
        mock_M4Node.getValue = jasmine.createSpy('mock_nodeGetValue').and.callFake(getValueMock);
        mock_M4Object.getNode = jasmine.createSpy('mock_m4oGetNode').and.returnValue(mock_M4Node);
        meta4.automationLegacy.employee.__testonly__._setM4Object(mock_M4Object);

        try{
            meta4.automationLegacy.employee.__testonly__._onLoadEmployeeDetailSuccess();
            expect(true).toBeFalsy();
        }catch(error){
            var empDetail = meta4.automationLegacy.employee.__testonly__._getEmpDetail();
            expect(empDetail).toBeFalsy();
        }
    });
});
