import React from 'react'
import axios from 'axios'
import Media from 'react-bootstrap/Media'
import placeholderPic from '../../../../assets/images/krusty-krab.png'
import { withRouter } from 'react-router-dom'

class Menu extends React.Component {
    constructor(props) {
        super(props)
        // this.props.match.params.rid get :rid from URL in Route that encloses this class
        // Need to wrap this class in withRouter to use match
        console.log("Menu props res ID " + this.props.match.params.rid)
        this.restaurant_id = this.props.match.params.rid
        this.state = { menu: null }
    }

    componentDidMount() {
        let menu_url = '/api/v1/restaurants/' + this.restaurant_id + '/menu.json'
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
    }

    render() {


        if (this.menu === null) {
            return (
                <h3>This restaurant is not selling anything at the moment.</h3>
            )
        } else {
            // menu is an object, not array as keys are strings instead of array indices
            // so iterate instead of map()
            let menuObject = this.state.menu    // {section => array of food}
            let menuArray = []
            for (let section in menuObject) {
                if (menuObject.hasOwnProperty(section)) {
                    let food_array = menuObject[section];
                    
                    menuArray.push(
                        // Section Header
                        <div className='menu-section-header'>
                            <br/><br/>
                            <h2>{ section }</h2>
                        </div>
                    )

                    for (let food of food_array) {
                        menuArray.push(
                            <div className='menu-media'>
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
                                        <h3>{food.f_name}</h3>
                                        <h5>${food.price}</h5>
                                    </Media.Body>
                                </Media>
                            </div>
                        )
                    }
                }
            }
            menuArray.push(<div><br/><br/><br/><br/></div>)

            return (
                <div className='menu-container'>
                    {menuArray}
                </div>
            )
        }
    }
}

export default withRouter(Menu)
