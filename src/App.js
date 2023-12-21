import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Items from './components/Items';
import Header from './components/Header';
import Footer from './components/Footer';
import Profile from './components/Profile';
import Notification from './components/Notification';
import AboutUs from './components/AboutUs';
import Contacts from './components/Contacts';
import LoginForm from './components/LoginForm';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      currentItems: [],
      items: [
        {
          id: 1,
          title: 'Кроссовки New Balance 999',
          img: 'NewBalance999.jpg',
          desc: 'A good sneakers for a walk',
          category: 'sneakers',
          price: '150',
        },
        {
          id: 2,
          title: 'Кроссовки New Balance 574',
          img: 'NewBalance574.jpeg',
          desc: 'A good sneakers for serious people',
          category: 'sneakers',
          price: '140',
        },
        {
          id: 3,
          title: 'Кеды Vans Pro Skateers',
          img: 'VansProSkateers.jpg',
          desc: 'For active skate sport',
          category: 'shoes',
          price: '130',
        },
        {
          id: 4,
          title: 'Кроссовки New Balance 576',
          img: 'NewBalance576.png',
          desc: 'A good sneakers for serious people',
          category: 'sneakers',
          price: '140',
        },
        {
          id: 5,
          title: 'Reebok club c85',
          img: 'ReebokClubC85.jpg',
          desc: 'A good sneakers for teens',
          category: 'sneakers',
          price: '130',
        },
        {
          id: 6,
          title: 'Adidas Gazelle',
          img: 'AdidasGazelle.jpg',
          desc: 'For vintage people',
          category: 'shoes',
          price: '120',
        },
        {
          id: 7,
          title: 'Reebok winter edition',
          img: 'ReebokWinterEdition.jpg',
          desc: 'A good sneakers for a winter',
          category: 'sneakers',
          price: '250',
        },
      ],
      searchQuery: '',
      notificationMessage: '',
      notificationType: '',
      username: null,
      showLoginForm: true,
    };

    this.state.currentItems = this.filterItems(this.state.items);
    this.addToOrder = this.addToOrder.bind(this);
    this.deleteOrder = this.deleteOrder.bind(this);
    this.clearCart = this.clearCart.bind(this);
    this.chooseCategory = this.chooseCategory.bind(this);
    this.updateSearchQuery = this.updateSearchQuery.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
  }

  chooseCategory(category) {
    if (category === 'all') {
      this.setState({ currentItems: this.filterItems(this.state.items) });
      return;
    }

    const filteredItems = this.filterItems(this.state.items, category);
    this.setState({ currentItems: filteredItems });
  }

  deleteOrder(id) {
    this.setState({ orders: this.state.orders.filter(el => el.id !== id) });
  }

  clearCart() {
    if (this.state.orders.length === 0) {
      return;
    }

    this.setState({
      orders: [],
      notificationMessage: 'Все товары из корзины удалены.',
      notificationType: 'success',
    });

    setTimeout(() => {
      this.setState({ notificationMessage: '', notificationType: '' });
    }, 3000);
  }

  addToOrder(item) {
    let isInArray = false;
    this.state.orders.forEach(el => {
      if (el.id === item.id) isInArray = true;
    });
    if (!isInArray) {
      this.setState({ orders: [...this.state.orders, item] });

      this.setState({
        notificationMessage: `Товар '${item.title}' стоимостью ${item.price}$ добавлен в корзину.`,
        notificationType: 'success',
      });

      setTimeout(() => {
        this.setState({ notificationMessage: '', notificationType: '' });
      }, 3000);
    }
  }

  updateSearchQuery(query) {
    this.setState({ searchQuery: query });

    if (!query.trim()) {
      this.setState({ currentItems: this.filterItems(this.state.items, this.state.category) });
      return;
    }

    this.setState({ currentItems: this.filterItems(this.state.items, this.state.category, query) });
  }

  filterItems(items, category = 'all') {
    const { searchQuery } = this.state;

    return items.filter(el => {
      const categoryMatch = category === 'all' || el.category === category;
      const searchMatch = el.title.toLowerCase().includes(searchQuery.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }

  toggleForm() {
    this.setState((prevState) => ({
      showLoginForm: !prevState.showLoginForm,
    }));
  }

  updateUsername(username) {
    this.setState({ username });
  }

  placeOrder() {
    if (this.state.orders.length === 0) {
      return;
    }

    this.setState({
      orders: [],
      notificationMessage: 'Заказ оформлен!',
      notificationType: 'success',
    });

    setTimeout(() => {
      this.setState({ notificationMessage: '', notificationType: '' });
    }, 3000);
  }

  render() {
    return (
      <Router>
        <div className="wrapper">
          <Header
            orders={this.state.orders}
            onDelete={this.deleteOrder}
            onClearCart={this.clearCart}
            onUpdateSearchQuery={this.updateSearchQuery}
            searchQuery={this.state.searchQuery}
            username={this.state.username}
            showLoginForm={this.state.showLoginForm}
            onToggleForm={this.toggleForm}
            onPlaceOrder={this.placeOrder}
          />
          <Notification
            message={this.state.notificationMessage}
            type={this.state.notificationType}
          />
          <Routes>
            <Route
              path="/"
              element={<Items items={this.state.currentItems} onAdd={this.addToOrder} onClearCart={this.clearCart} />}
            />
            <Route path="/profile" element={<Profile />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route
              path="/login"
              element={<LoginForm
                onLoginSuccess={this.updateUsername}
                onToggleForm={this.toggleForm}
                showLoginForm={this.state.showLoginForm}
              />}
            />
          </Routes>
          <Footer />
          <ToastContainer position="bottom-right" />
        </div>
      </Router>
    );
  }
}

export default App;
