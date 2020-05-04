if(window.require){
    require("./lib/jasmine-3.5.0/jasmine");
    require("../personal");
}

describe("PA - Personnel.Admin > Emp.Info > Personal - getFormSection (Suite)", function () {
    var mock_utils;
    var mock_form;
    var mock_m4Node;
    var mock_m4Object;

    beforeEach(function () {
        mock_form = jasmine.createSpyObj('mock_form', ['setChannel','setNode','setCurrentIndex']);

        mock_utils = jasmine.createSpyObj('mock_utils', {
            'getM4Form_Table': mock_form
        });

        meta4.pa.employeeInformation.Personal.__test__only__._mock_utils(mock_utils);

        mock_m4Node = jasmine.createSpyObj('mock_m4node', ['getCurrent']);
        mock_m4Object = jasmine.createSpy('mock_m4object');
    });

    it("should not throws an exception", function () {
        var idForm = "MOCK_ID_FORM";
        var idNode = "MOCK_ID_NODE";
        var node = mock_m4Node;
        var channel = mock_m4Object;

        var originalFunction = meta4.pa.employeeInformation.Personal.__test__only__._getFormToSection;
        
        expect(originalFunction,idForm,idNode,node,channel).not.toThrow();
    });

    it("should load form with current position", function () {
        var idForm = "MOCK_ID_FORM";
        var idNode = "MOCK_ID_NODE";
        var node = mock_m4Node;
        var channel = mock_m4Object;

        var form = meta4.pa.employeeInformation.Personal.__test__only__._getFormToSection(idForm, idNode, node, channel);
        
        expect(form).toBeTruthy();
        expect(mock_form.setChannel).toHaveBeenCalledWith(channel);
        expect(mock_form.setNode).toHaveBeenCalledWith(idNode);
        expect(mock_form.setCurrentIndex).toHaveBeenCalled();
    });

    it("should load form without current position", function () {
        var idForm = "MOCK_ID_FORM";
        var idNode = "MOCK_ID_NODE";
        var node = null;
        var channel = mock_m4Object;

        var form = meta4.pa.employeeInformation.Personal.__test__only__._getFormToSection(idForm, idNode, node, channel);
        
        expect(form).toBeTruthy();
        expect(mock_form.setChannel).toHaveBeenCalledWith(channel);
        expect(mock_form.setNode).toHaveBeenCalledWith(idNode);
        expect(mock_form.setCurrentIndex).not.toHaveBeenCalled();
    });

});
