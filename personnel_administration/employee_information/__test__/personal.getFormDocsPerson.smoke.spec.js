if(window.require){
    require("./lib/jasmine-3.5.0/jasmine");
    require("../personal");
}

describe("PA - Personnel.Admin > Emp.Info > Personal - getFormDocsPerson (Suite)", function () {
    var mock_utils;
    var mock_form;
    var mock_channelDoc;
    var mock_nodeDocs;
    var mock_setOptionsList;
    
    beforeEach(function () {
        meta4.exports = {};
        meta4.exports.widget = {};
        meta4.exports.widget.MultipleItem = jasmine.createSpy('mock_widget.MultipleItem');

        mock_channelDoc = jasmine.createSpy('mock_t3');
        mock_nodeDocs = jasmine.createSpyObj('mock_m4node', ['getObject','getId','getCurrent']);

        var mock_data = {};
        mock_data.t3Documents = {};
        mock_data.t3Documents.nodeDocs = {};
        mock_data.t3ManageDocsPersonal = {};
        mock_data.t3Documents.nodeConfigFields = {};

        mock_data.t3Documents.nodeDocs.node = mock_nodeDocs;
        mock_data.t3ManageDocsPersonal.t3 = mock_channelDoc;
        mock_data.t3Documents.nodeConfigFields.node = jasmine.createSpy('mock_nodeConfigFields.node');

        mock_form = jasmine.createSpyObj('mock_form', ['setChannel','setNode','setCurrentIndex','addChild','setValidations']);
        mock_setOptionsList = jasmine.createSpy('setOptionsList'),

        mock_utils = jasmine.createSpyObj('mock_utils', {
            'objT3' : jasmine.createSpy('objT3'),
            'getM4Form_Table': mock_form,
            'notIsNullUndefined': jasmine.createSpy('notIsNullUndefined'),
            'setOptionsList': mock_setOptionsList,
            'getCalendar': jasmine.createSpy('getCalendar'),
            'getDocmanage': jasmine.createSpy('getDocmanage'),
            'getComment': jasmine.createSpy('getComment'),
            'validationForms': jasmine.createSpy('validationForms'),
            'getM4ListJsFull': jasmine.createSpy('getM4ListJsFull')
        });

        mock_utils.data = mock_data;
        mock_utils.getCalendar.and.returnValue(null);

        meta4.pa.employeeInformation.Personal.__test__only__._mock_utils(mock_utils);
    });

    it("should create a form component", function () {
        var args = {
            dataEmpMod: false,
            idForm: "STUB_ID_FORM"
        };

        var formDoc = meta4.pa.employeeInformation.Personal.__test__only__._getFormDocsPerson(args);

        expect(formDoc).toBeTruthy();
        expect(formDoc.setChannel).toHaveBeenCalled();
        expect(formDoc.setNode).toHaveBeenCalled();
        expect(formDoc.setCurrentIndex).toHaveBeenCalled();
    });

    it("should set form validations", function () {
        var args = {
            dataEmpMod: false,
            idForm: "STUB_ID_FORM"
        };

        var formDoc = meta4.pa.employeeInformation.Personal.__test__only__._getFormDocsPerson(args);

        expect(formDoc.setValidations).toHaveBeenCalled();
    });

    it("should add four childs in the form component", function () {
        var args = {
            dataEmpMod: false,
            idForm: "STUB_ID_FORM"
        };

        var formDoc = meta4.pa.employeeInformation.Personal.__test__only__._getFormDocsPerson(args);
        
        expect(formDoc.addChild).toHaveBeenCalledTimes(4);
    });

    it("should add document type list as first child", function () {
        var args = {
            dataEmpMod: false,
            idForm: "STUB_ID_FORM"
        };

        var formDoc = meta4.pa.employeeInformation.Personal.__test__only__._getFormDocsPerson(args);
        var callAddChildArgs = formDoc.addChild.calls.argsFor(0)

        expect(mock_utils.getM4ListJsFull).toHaveBeenCalledWith('SCO_ID_DOC_TYPE',undefined);
        expect(callAddChildArgs[0]).toEqual(mock_setOptionsList);
    });

});
