import { LightningElement } from 'lwc';

/* Constants */
const DEV_QUESTIONS = 14;
const AUTOMATION_QUESTIONS = 18;
const UI_QUESTIONS = 15;
const TEST_QUESTIONS = 13;

const DEV_PERCENT = .23;
const AUTOMATION_PERCENT = .30;
const UI_PERCENT = .25;
const TEST_PERCENT = .22;

const PASSING_SCORE = 68;
const TOTAL_QUESTIONS = 60;

export default class PlatformDevCertCalculator extends LightningElement {
    devScore;
    devCorrect = 0;
    devIncorrect = 0;
    devResult = 0;;

    autoScore;
    autoCorrect = 0;
    autoIncorrect = 0;
    autoResult = 0;

    uiScore;
    uiCorrect = 0;
    uiIncorrect = 0;
    uiResult = 0;

    testScore;
    testCorrect = 0;
    testIncorrect = 0;
    testResult = 0;
    
    correctTotal = '?';
    incorrectTotal = '?';
    yourScore = '?';
    
    areDetailsVisible = false;
    scorePass = false;
    scoreFail = true;
    missingFields = false;;

    attemptHistory = [];
    currentHistory = 0;

    changeHandler(e) {
        switch (e.target.name) {
            case 'dev':
                if (e.target.value < 0 || e.target.value > 100 || e.target.value == '') {
                    this.devScore = '';
                    this.devCorrect = 0;
                    this.devIncorrect = 0;
                    this.devResult = 0;
                } else {
                    this.devScore = e.target.value;
                    this.devCorrect = Math.round(DEV_QUESTIONS * (this.devScore / 100));
                    this.devIncorrect = DEV_QUESTIONS - this.devCorrect;
                    this.devResult = Math.round((DEV_PERCENT * (this.devScore / 100)) * 100);
                } 
                break;
            case 'auto':
                if (e.target.value < 0 || e.target.value > 100 || e.target.value == '') {
                    this.autScore = '';
                    this.autoCorrect = 0;
                    this.autoIncorrect = 0;
                    this.autoResult = 0;
                } else {
                    this.autoScore = e.target.value;
                    this.autoCorrect = Math.round(AUTOMATION_QUESTIONS * (this.autoScore / 100));
                    this.autoIncorrect = AUTOMATION_QUESTIONS - this.autoCorrect;
                    this.autoResult = Math.round((AUTOMATION_PERCENT * (this.autoScore / 100)) * 100);
                }
                break;
            case 'ui':
                if (e.target.value < 0 || e.target.value > 100 || e.target.value == '') {
                    this.uiScore = '';
                    this.uiCorrect = 0;
                    this.uiIncorrect = 0;
                    this.uiResult = 0;
                } else {
                    this.uiScore = e.target.value;
                    this.uiCorrect = Math.round(UI_QUESTIONS * (this.uiScore / 100));
                    this.uiIncorrect = UI_QUESTIONS - this.uiCorrect;
                    this.uiResult = Math.round((UI_PERCENT * (this.uiScore / 100)) * 100);
                } 
                break;
            case 'test':
                if (e.target.value < 0 || e.target.value > 100 || e.target.value == '') {
                    this.testScore = '';
                    this.testCorrect = 0;
                    this.testIncorrect = 0;
                    this.testResult = 0;
                } else {
                    this.testScore = e.target.value;
                    this.testCorrect = Math.round(TEST_QUESTIONS * (this.testScore / 100));
                    this.testIncorrect = TEST_QUESTIONS - this.testCorrect;
                    this.testResult = Math.round((TEST_PERCENT * (this.testScore / 100)) * 100);
                }
                break;
        }
    }

    closeError() {
        this.missingFields = false;
    }

    calculateScores() {
        if (this.devScore == '' || this.autoScore == '' || this.uiScore == '' || this.testScore == '' || 
            this.devScore == null || this.autoScore == null || this.uiScore == null || this.testScore == null) {
            this.missingFields = true;
        } else {
            this.missingFields = false;

            this.correctTotal = this.devCorrect + this.autoCorrect + this.uiCorrect + this.testCorrect;
            this.incorrectTotal = this.devIncorrect + this.autoIncorrect + this.uiIncorrect + this.testIncorrect;
            this.yourScore = Math.round((this.correctTotal / TOTAL_QUESTIONS) * 100);

            this.areDetailsVisible = true;

            if (this.yourScore >= 68) {
                this.scorePass = true;
                this.scoreFail = false;
            } else {
                this.scorePass = false;
                this.scoreFail = true;
            }

            this.addAttempt(this.yourScore, this.correctTotal, this.incorrectTotal);
        }        
    }

    resetScores() {
        this.devScore = '';
        this.devCorrect = 0;
        this.devIncorrect = 0;
        this.devResult = 0;

        this.autoScore = '';
        this.autoCorrect = 0;
        this.autoIncorrect = 0;
        this.autoResult = 0;

        this.uiScore = '';
        this.uiCorrect = 0;
        this.uiIncorrect = 0;
        this.uiResult = 0;

        this.testScore = '';
        this.testCorrect = 0;
        this.testIncorrect = 0;
        this.testResult = 0;
        
        this.correctTotal = '?';
        this.incorrectTotal = '?';
        this.yourScore = '?';

        this.areDetailsVisible = false;
        this.scoreFail = true;
        this.scorePass = false;
        this.missingFields = false;
    }

    addAttempt(score, correct, incorrect) {
        this.currentHistory++;

        this.attemptHistory = [
            ...this.attemptHistory,
            {id: this.currentHistory, score, correct, incorrect}
        ];
    }

    deleteAttemptEvent(e) {
        this.attemptHistory = this.attemptHistory.filter(attempt => attempt.id != e.detail.id);
    }
}