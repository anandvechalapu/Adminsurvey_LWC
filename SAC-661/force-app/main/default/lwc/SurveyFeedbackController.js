import { LightningElement, api, track, wire } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getObjectValues } from 'lightning/uiObjectInfoApi';
import { getRecord } from 'lightning/uiRecordApi';
import SURVEY_QUESTION_OBJECT from '@salesforce/schema/Survey_Question__c';
import SURVEY_QUESTION_CHOICES_OBJECT from '@salesforce/schema/Survey_Question_Choices__c';
import SURVEY_RESPONSE_OBJECT from '@salesforce/schema/Survey_Response__c';

export default class SurveyFeedbackLWC extends LightningElement {
    @api recordId;
    @track surveyQuestions = [];
    @track surveyQuestionChoices = [];
    @track surveyResponses = [];

    // Get the object info
    @wire(getObjectInfo, { objectApiName: SURVEY_QUESTION_OBJECT })
    surveyQuestionObjectInfo;
    @wire(getObjectInfo, { objectApiName: SURVEY_QUESTION_CHOICES_OBJECT })
    surveyQuestionChoicesObjectInfo;
    @wire(getObjectInfo, { objectApiName: SURVEY_RESPONSE_OBJECT })
    surveyResponseObjectInfo;

    // Get the picklist values
    @wire(getPicklistValues, {
        recordTypeId: '$surveyQuestionObjectInfo.data.defaultRecordTypeId',
        fieldApiName: SURVEY_QUESTION_OBJECT.Type__c.fieldApiName
    })
    surveyQuestionObjectPicklistValues;
    @wire(getPicklistValues, {
        recordTypeId: '$surveyQuestionChoicesObjectInfo.data.defaultRecordTypeId',
        fieldApiName: SURVEY_QUESTION_CHOICES_OBJECT.Answer__c.fieldApiName
    })
    surveyQuestionChoicesObjectPicklistValues;

    // Get the object values
    @wire(getObjectValues, { objectApiName: SURVEY_QUESTION_OBJECT })
    surveyQuestionObjectValues;
    @wire(getObjectValues, { objectApiName: SURVEY_QUESTION_CHOICES_OBJECT })
    surveyQuestionChoicesObjectValues;
    @wire(getObjectValues, { objectApiName: SURVEY_RESPONSE_OBJECT })
    surveyResponseObjectValues;

    // Get the survey questions
    @wire(getRecord, {
        recordId: '$recordId',
        fields: [SURVEY_QUESTION_OBJECT.Type__c, SURVEY_QUESTION_OBJECT.Question_Text__c]
    })
    surveyQuestions({ error, data }) {
        if (data) {
            this.surveyQuestions = data;
        } else if (error) {
            // eslint-disable-next-line no-console
            console.log(error);
        }
    }

    // Get the survey question choices
    @wire(getRecord, {
        recordId: '$recordId',
        fields: [SURVEY_QUESTION_CHOICES_OBJECT.Answer__c]
    })
    surveyQuestionChoices({ error, data }) {
        if (data) {
            this.surveyQuestionChoices = data;
        } else if (error) {
            // eslint-disable-next-line no-console
            console.log(error);
        }
    }

    // Get the survey responses
    @wire(getRecord, {
        recordId: '$recordId',
        fields: [SURVEY_RESPONSE_OBJECT.Response__c]
    })
    surveyResponses({ error, data }) {
        if (data) {
            this.surveyResponses = data;
        } else if (error) {
            // eslint-disable-next-line no-console
            console.log(error);
        }
    }

    // Save the survey response
    saveResponse() {
        // logic to save the survey response
    }
}