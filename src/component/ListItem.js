import React, {Component, Fragment} from "react";

export default class ListItem extends Component {

    render() {
        return (
        <Fragment>
        <li 
            className="listItem" 
            onClick={() => this.props.handleListItemClick(this.props)}
            tabIndex="1"
        >
            <img src={this.props.categories[0].icon.prefix+"32"+this.props.categories[0].icon.suffix} tabIndex="0" alt={this.props.categories[0].name} />
            {this.props.name}
            </li>
        </Fragment>
        );    
    }
}