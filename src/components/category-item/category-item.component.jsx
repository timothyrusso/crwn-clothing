import './category-item.component.scss';

const CategoryItem = ({ category }) => {
  
    const { imageUrl, title } = category;
  
    return (
    <div className="category-container">
      <div
        className="background-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
        alt="Background for the category"
      />
      <div className="category-body-container">
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
};

export default CategoryItem;
