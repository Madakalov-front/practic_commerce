import { sortProducts } from "../filterSort/filterSort";

export const createProductStateManager = (initialProducts) => {
    let products = [...initialProducts];
    let activeFilters = new Set();
    let currentSort = null;

    const applyFiltersAndSort = () => {
        let result = [...initialProducts];
        
        // Применяем фильтры
        if (activeFilters.size > 0) {
            result = result.filter(product => 
                Array.from(activeFilters).some(filter => {
                    const filterFunc = {
                        new: (p) => p.isNew,
                        inStock: (p) => p.inStock,
                        contract: (p) => p.isContract,
                        exclusive: (p) => p.isExclusive,
                        sale: (p) => p.isSale
                    }[filter];
                    return filterFunc ? filterFunc(product) : false;
                })
            );
        }
        
        // Применяем сортировку
        if (currentSort) {
            result = sortProducts(result, currentSort);
        }
        
        return result;
    };

    return {
        toggleFilter: (filter) => {
            if (activeFilters.has(filter)) {
                activeFilters.delete(filter);
            } else {
                activeFilters.add(filter);
            }
            return applyFiltersAndSort();
        },
        applySort: (sortType) => {
            currentSort = sortType;
            return applyFiltersAndSort();
        },
        getCurrentProducts: () => applyFiltersAndSort()
    };
};