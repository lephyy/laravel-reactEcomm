function FetchProduct({image,price}) {
    return ( 
    <div className="item">
        <div className="image_main">
        <img src={image} alt="Product" />
        </div>
        <h6 className="price_text">
        Price <br />
        <span style={{ color: '#f75261' }}>${price}</span>
        </h6>
    </div>  
    );
}
export default FetchProduct;