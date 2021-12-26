import * as React from "react";

class QuestionProps {
    yButtonText: string;
    yButtonClass?: string = "btn-primary";
    yButtonFunc: () => void;
    nButtonText: string;
    nButtonClass: string;
    nButtonFunc?: () => void;
    id: string;
    message: string;
    title: string;
}


export default class Question extends React.Component<QuestionProps, {}> {
    constructor(props: QuestionProps) {
        super(props);
    }

    render() {
        return (

            <div className="modal fade" id={this.props.id} role="dialog" aria-labelledby={this.props.id} aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{this.props.title}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>{this.props.message}</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className={"btn " + this.props.nButtonClass} data-dismiss="modal" onClick={this.props.nButtonFunc}>
                                {this.props.nButtonText}
                            </button>
                            <button type="button" className={"btn " + this.props.yButtonClass} data-dismiss="modal" onClick={this.props.yButtonFunc}>
                                {this.props.yButtonText}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}