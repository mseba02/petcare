import React, {Component} from "react";
import {connect} from 'react-redux';
import './homepage.css';

class Homepage extends Component {
    render() {
        return(
            <div>
                <section className="homepage-header padding5">
                    <div className="container">
                        <h3 className="text-center font-nunito">Welcome to Pet Care</h3>
                        <h5 className="font-nunito__sans text-center">You can buy, sell or mating a pet, you can buy food, or clothes for him. Everything you want is here.</h5>
                        <p className="font-nunito__sans text-center">We offer all the best quality products for your best friend.</p>
                        {console.log(this.props.data.products.popular)}
                    </div>
                </section>
                {/*//   popular products*/}
                <section className="popularProducts padding5">
                    <div className="container">
                        <h2 className="font-nunito popularProducts__title text-center">Popular Products</h2>
                        <ul className="popularProducts__ul d-flex flex-wrap justify-content-center">
                            {this.props.data.products.popular.map((item, index) => {
                                return <li className="flex-4 text-center" key={index}>
                                    <div className="popularProducts__img">
                                        <img src={item.img}/>
                                        <span>{item.tag}</span>
                                    </div>
                                    <span>{item.name}</span>
                                    <span>{item.price}</span>
                                    <a className="button">Add to cart</a>
                                </li>
                            })}
                        </ul>
                    </div>
                </section>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
   return {
       data: state.data
   }
}
export default connect(mapStateToProps)(Homepage);