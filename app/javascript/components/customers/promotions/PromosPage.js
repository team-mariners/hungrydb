import React from 'react';
import axios from 'axios';
import PromoItem from './PromoItem';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

class PromosPage extends React.Component {
    constructor(props) {
        super(props);
        this.handleEnterSearchQuery = this.handleEnterSearchQuery.bind(this);
        this.state = {fds_promos: null, restaurant_promos: null, searchQuery: ""};
    }

    componentDidMount() {
        axios.get('/api/v1/promotions/promotions.json')
            .then(
                (response) => {
                    const retrieved_fds_promos = response.data.fds_promos;
                    const retrieved_res_promos = response.data.restaurant_promos;
                    this.setState({
                        fds_promos: retrieved_fds_promos,
                        restaurant_promos: retrieved_res_promos
                    });
                    console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }

    handleEnterSearchQuery(e) {
        this.setState({searchQuery: e.target.value});
        console.log(e.target.value);
    }

    render() {
        if (!this.state.fds_promos && !this.state.restaurant_promos) {
            return null;
        } else {
            let fds_promos = this.state.fds_promos.map((fpromo) => {
                if (!this.state.searchQuery ||
                    (this.state.searchQuery &&
                    fpromo.promocode.toUpperCase()
                        .includes(this.state.searchQuery.toUpperCase()))) {
                    return (
                        <PromoItem promo={fpromo}/>
                    )
                }
            })

            let resPromosArray = [];
            let resPromos = this.state.restaurant_promos;
            for (let rname in resPromos) {
                if (resPromos.hasOwnProperty(rname)) {
                    if (resPromos[rname].length == 0) {
                        continue;
                    }

                    // Create PromoItem from all promos by current restaurant rname
                    let currResPromos = resPromos[rname].map((rpromo) => {
                        if (!this.state.searchQuery ||
                            (this.state.searchQuery &&
                            rpromo.promocode.toUpperCase()
                                .includes(this.state.searchQuery.toUpperCase()))) {
                            return <PromoItem promo={rpromo} />
                        }
                    });

                    resPromosArray.push(
                        <div className='promo-page-container'>
                            <div><br/></div>
                            <h3>{rname} Promotions:</h3>
                            <ListGroup style={{ width: 500, marginLeft: "auto", marginRight: "auto" }}>
                               {currResPromos}
                            </ListGroup>
                            <div><br/></div>
                        </div>
                    )
                }
            }
            return (
                <div className='promo-page-container'>
                    <div><br/></div>
                    <Form inline>
                            <FormControl type="text" placeholder="Search Promotions"
                                className="mr-sm-2" onChange={this.handleEnterSearchQuery} />
                    </Form>
                    <div><br/><br/></div>
                    <h3>App-Wide Promotions:</h3>
                    <ListGroup fluid style={{ width: 500, marginLeft: "auto", marginRight: "auto" }}>
                        {fds_promos}
                    </ListGroup>
                    <div><br/></div>
                    {resPromosArray}
                    <div><br/><br/></div>
                </div>
            )
        }
    }
}

export default PromosPage;
