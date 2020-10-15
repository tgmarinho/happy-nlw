"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    render(image) {
        return {
            url: `${process.env.API_URL}/uploads/${image.path}`
        };
    },
    renderMany(images) {
        return images.map(image => this.render(image));
    }
};
