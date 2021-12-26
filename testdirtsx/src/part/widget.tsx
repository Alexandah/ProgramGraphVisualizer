import * as React from "react";
import DataLayer from "src/datalayer";
import BarItemModel from "src/model/filter";

export interface WidgetModel {
    title: string;
    count: number;
    footer: string;
    green: string;
    icon: string;
    onClick: () => void;
}



export default function WidgetCount(props: WidgetModel) {
    return <div className="col-6 col-md-3 tile_stats_count" onClick={props.onClick}>
        <span className="count-top"><i className={props.icon}> </i> {props.title}</span>
        <div className="count">{
            props.count === DataLayer.WIDGET_UpdatePending
                ? <i className="fa fa-spinner fa-spin" />
                : BarItemModel.formatCount(props.count)
        }
        </div>
        <span className="count-bottom"><span className="green"> <b>{props.green}</b> </span> {props.footer}</span>
    </div>
}