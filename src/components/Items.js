import React, { Component } from 'react';
import Item from './Item';

export class Items extends Component {
    render() {
        // Добавлено: проверка на существование массива this.props.items
        if (!this.props.items || this.props.items.length === 0) {
            return (
                <div className="empty">
                    <h2>Товаров нет</h2>
                </div>
            );
        }

        return (
            <main>
                {this.props.items.map(el => <Item key={el.id} item={el} onAdd={this.props.onAdd} onShowItem={this.props.onShowItem} />)}
            </main>
        );
    }
}

export default Items;
