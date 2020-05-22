if(window.require){
    require("../../__lib__/jasmine-3.5.0/jasmine");
    require("../automationLegacy");
}

describe("Automation Legacy - Employee: Load Employee Detail (Suite)", function () {
    var mock_M4Node = null;
    var mock_M4Object = null;

    beforeEach(function () {
        mock_M4Node = jasmine.createSpyObj("mock_M4Node",['count','moveTo']);
        mock_M4Object= jasmine.createSpyObj("mock_M4Object",['getNode']);
        meta4.data = {}
        meta4.data.utils = {};
    });

    it("should not throw Error with a public employe profile", function () {
        var privateProfile = 0;
        meta4.data.utils.getValue = jasmine.createSpy('mock_nodeGetValue').and.returnValue(privateProfile);
        mock_M4Node.count = jasmine.createSpy('mock_nodeCount').and.returnValue(1);
        mock_M4Object.getNode = jasmine.createSpy('mock_m4oGetNode').and.returnValue(mock_M4Node);
        meta4.automationLegacy.employee.__testonly__._setM4Object(mock_M4Object);

        var testFunc = meta4.automationLegacy.employee.__testonly__._onLoadEmployeeDetailSuccess;
        expect(testFunc).not.toThrowError();
    });

    it("should load detail from a public employe profile", function () {
        function getValueMock(node, itemKey) {
            var values = {PROP_IS_PRIVATE: 0, PROP_ID: 'idvalue', PROP_NAME: 'nameValue', PROP_AGE: 36}
            return values[itemKey]
        }
        meta4.data.utils.getValue = jasmine.createSpy('mock_nodeGetValue').and.callFake(getValueMock);
        mock_M4Node.count = jasmine.createSpy('mock_nodeCount').and.returnValue(1);
        mock_M4Object.getNode = jasmine.createSpy('mock_m4oGetNode').and.returnValue(mock_M4Node);
        meta4.automationLegacy.employee.__testonly__._setM4Object(mock_M4Object);

        meta4.automationLegacy.employee.__testonly__._onLoadEmployeeDetailSuccess();

        expect(meta4.data.utils.getValue).toHaveBeenCalledTimes(4);
        expect(meta4.data.utils.getValue.calls.argsFor(0)).toEqual([mock_M4Node,'PROP_IS_PRIVATE']);
        expect(meta4.data.utils.getValue.calls.argsFor(1)).toEqual([mock_M4Node,'PROP_ID']);
        expect(meta4.data.utils.getValue.calls.argsFor(2)).toEqual([mock_M4Node,'PROP_NAME']);
        expect(meta4.data.utils.getValue.calls.argsFor(3)).toEqual([mock_M4Node,'PROP_AGE']);
    });

    it("should throw Error with a private employe profile", function () {
        var privateProfile = 1;
        meta4.data.utils.getValue = jasmine.createSpy('mock_nodeGetValue').and.returnValue(privateProfile);
        mock_M4Node.count = jasmine.createSpy('mock_nodeCount').and.returnValue(1);
        mock_M4Object.getNode = jasmine.createSpy('mock_m4oGetNode').and.returnValue(mock_M4Node);
        meta4.automationLegacy.employee.__testonly__._setM4Object(mock_M4Object);

        var testFunc = meta4.automationLegacy.employee.__testonly__._onLoadEmployeeDetailSuccess;
        expect(testFunc).toThrowError();
    });

    it("should not load detail from a private employe profile", function () {
        function getValueMock(node, itemKey) {
            var values = {PROP_IS_PRIVATE: 1, PROP_ID: 'idvalue', PROP_NAME: 'nameValue', PROP_AGE: 36}
            return values[itemKey]
        }
        meta4.data.utils.getValue = jasmine.createSpy('mock_nodeGetValue').and.callFake(getValueMock);
        mock_M4Node.count = jasmine.createSpy('mock_nodeCount').and.returnValue(1);
        mock_M4Object.getNode = jasmine.createSpy('mock_m4oGetNode').and.returnValue(mock_M4Node);
        meta4.automationLegacy.employee.__testonly__._setM4Object(mock_M4Object);

        try{
            meta4.automationLegacy.employee.__testonly__._onLoadEmployeeDetailSuccess();
            expect(true).toBeFalsy();
        }catch(error){
            expect(meta4.data.utils.getValue).toHaveBeenCalledTimes(1);
            expect(meta4.data.utils.getValue.calls.argsFor(0)).toEqual([mock_M4Node,'PROP_IS_PRIVATE']);
        }
    });
});
