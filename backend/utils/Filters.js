class Filters {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
    this.filteredQueryNum = 0;
  }

  /**
   *
   * @param {*} itemsPerPage
   * @returns {Object} this object
   */
  async search(itemsPerPage) {
    // search option (name)
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    // filter option (price, category, ratings)
    const queryCopy = { ...this.queryStr };
    delete queryCopy["keyword"];
    delete queryCopy["page"];

    const regex = /\b(gt|gte|lt|lte|in)\b/g;
    let filterStr = JSON.stringify(queryCopy);
    filterStr = filterStr.replace(regex, (match) => `$${match}`);

    filterStr = await JSON.parse(filterStr);

    // aggregate search & filter options
    const condition = { ...keyword, ...filterStr };

    // pagination
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = itemsPerPage * (currentPage - 1);

    const foundProducts = await this.query.find({ ...condition });
    this.filteredQueryNum = foundProducts.length;

    // query from the database
    this.query = await this.query.find({ ...condition });
    // .limit(itemsPerPage)
    // .skip(skip);
    return this;
  }
}

module.exports = Filters;
