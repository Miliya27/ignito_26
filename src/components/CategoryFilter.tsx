interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryFilter({ categories, activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="category-filter">
      {categories.map((cat) => (
        <button
          key={cat}
          className={`category-tab ${activeCategory === cat ? 'active' : ''}`}
          onClick={() => onCategoryChange(cat)}
          data-cursor-hover
        >
          {cat}
          <span className="tab-underline" />
        </button>
      ))}
    </div>
  );
}
