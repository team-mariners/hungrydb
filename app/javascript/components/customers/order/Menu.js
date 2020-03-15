import React from 'react'
import axios from 'axios'
import Media from 'react-bootstrap/Media'
import placeholderPic from '../../../../assets/images/krusty-krab.png'

class Menu extends React.Component {
    constructor(props) {
        super(props);
        console.log("Menu props res ID " + this.props.restaurant_id);
        this.state = { menu: null };
    }



    render() {
        let menu_url = '/api/v1/restaurants/' + this.props.restaurant_id + '/menu.json'
        axios.get(menu_url)
            .then(
                (response) => {
                    const retrieved_menu = response.data.menu
                    this.setState({ menu: retrieved_menu })
                    console.log(this.state.menu)
                })
            .catch(error => {
                console.log(error)
            })

        if (this.state.menu === null) {
            return (
                <h3>This restaurant is not selling anything at the moment.</h3>
            )
        } else {
            // menu is an object, not array as keys are strings instead of array indices so no map()
            let menuObject = this.state.menu
            let menuArray = []
            for (let key in menuObject) {
                if (menuObject.hasOwnProperty(key)) {
                    for (let item of menuObject[key]) {
                        menuArray.push(
                            <div className='restaurant-media'>
                                <Media>
                                    <img
                                        width={120}
                                        height={120}
                                        className="align-self-center mr-3"
                                        src={placeholderPic}
                                        alt="Generic placeholder"
                                    />
                                    <Media.Body>
                                        <h5 />
                                        <h3>{item.f_name}</h3>
                                        <h5>${item.price}</h5>
                                    </Media.Body>
                                </Media>
                            </div>
                        )
                    }
                }
            }
            return (
                <div className='restaurants-container'>
                    {menuArray}
                </div>
            )
        }
    }
}

export default Menu
