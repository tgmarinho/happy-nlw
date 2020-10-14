"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    render(image) {
        return {
            url: `http://localhost:3333/uploads/${image.path}`
        };
    },
    renderMany(images) {
        return images.map(image => this.render(image));
    }
};
