import React from 'react';
import axios from 'axios';
import MenuItem from './MenuItem';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import { withRouter } from 'react-router-dom';
import secureStorage from '../../utilities/HungrySecureStorage';

class Menu extends React.Component {
    constructor(props) {
        super(props);
        // this.props.match.params.rid get :rid from URL in Route that encloses this class
        // Need to wrap this class in withRouter to use match
        console.log("Menu props res ID " + this.props.match.params.rid);
        this.restaurant_id = this.props.match.params.rid;
        this.handleEnterSearchQuery = this.handleEnterSearchQuery.bind(this);
        this.state = { menu: null, searchQuery: "" };
    }

    componentDidMount() {
        let menu_url = '/api/v1/restaurants/' + this.restaurant_id + '/menu.json';
        axios.get(menu_url)
            .then(
                (response) => {
                    const retrieved_menu = response.data.menu;
                    this.setState({ menu: retrieved_menu });
                    console.log(this.state.menu);
                })
            .catch(error => {
                console.log(error)
            })
    }

    handleEnterSearchQuery(e) {
        this.setState({searchQuery: e.target.value});
        console.log(e.target.value);
    }

    render() {
        if (this.state.menu == null) {
            return null;
        } else {
            // menu is an object, not array as keys are strings instead of array indices
            // so iterate instead of map()
            let menuObject = this.state.menu;    // {section => array of food}
            let menuArray = [];
            for (let section in menuObject) {
                if (menuObject.hasOwnProperty(section)) {
                    let food_array = menuObject[section];

                    menuArray.push(
                        // Section Header
                        <div className='menu-section-header'>
                            <br /><br /><br /><br />
                            <h2>{section}</h2>
                        </div>
                    )

                    for (let food of food_array) {
                        if (!this.state.searchQuery ||
                            (this.state.searchQuery &&
                            food.f_name.toUpperCase()
                                .includes(this.state.searchQuery.toUpperCase()))) {
                            menuArray.push(
                                <MenuItem food={food} onSubmitOrder={this.props.onSubmitOrder} />
                            )
                        }
                    }
                }
            }
            menuArray.push(<div><br /><br /><br /><br /></div>);

            if (Object.keys(menuObject).length == 0) {
                return (
                    <h3>This restaurant is not selling anything at the moment.</h3>
                )
            } else {
                return (
                    <div className='menu-container'>
                        <div><br /></div>
                        <h3>{secureStorage.getItem('restaurant_name')}</h3>
                        <div><br /></div>
                        <Form inline>
                            <FormControl type="text" placeholder="Search Food"
                                className="mr-sm-2" onChange={this.handleEnterSearchQuery} />
                        </Form>
                        {menuArray}
                    </div>
                )
            }
        }
    }
}

export default withRouter(Menu);
