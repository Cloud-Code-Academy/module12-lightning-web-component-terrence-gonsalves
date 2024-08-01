import { LightningElement, api } from 'lwc';

export default class ScoreInformation extends LightningElement {
    @api score;
    @api correct;
    @api incorrect;
    @api attemptId;

    deleteAttempt() {
        const deleteEvent = new CustomEvent('delete', {
            detail: {
                id: this.attemptId
            }
        });
        this.dispatchEvent(deleteEvent);
    }
}