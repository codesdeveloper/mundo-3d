const Itens_Textures = {
    createSofa: () => {
        var item = new Entity();
        item.setName("Cube");
        item.setPoints([{ x: -4, y: -3, z: -1 }, { x: -2, y: -3, z: -1 }, { x: 0, y: -3, z: -1 }, { x: 2, y: -3, z: -1 }, { x: 4, y: -1, z: -1 }, { x: 4, y: -1, z: -1 }, { x: 2, y: -1, z: -1 }, { x: 0, y: -1, z: -1 }, 
            { x: -2, y: 1, z: -1 }, { x: -4, y: -1, z: -1 }, { x: -4, y: -1, z: -1 }, { x: -2, y: -1, z: -1 }, { x: 0, y: -1, z: -1 }, { x: 2, y: -1, z: -1 }, { x: 4, y: -1, z: -1 }, { x: 4, y: -1, z: -1 }]);
        item.setEdges([{ a: 0, b: 1 }, { a: 1, b: 2 }, { a: 2, b: 3 }, { a: 3, b: 0 }, { a: 4, b: 5 }, { a: 5, b: 6 }, { a: 6, b: 7 }, { a: 7, b: 4 }, { a: 0, b: 4 }, { a: 1, b: 5 }, { a: 2, b: 6 }, { a: 3, b: 7 }]);
        item.setPolygonus([{ vertices: [1, 0, 3, 2] }, { vertices: [0, 4, 7, 3] }, { vertices: [4, 5, 6, 7] }, { vertices: [5, 1, 2, 6] }, { vertices: [0, 1, 5, 4] }, { vertices: [7, 6, 2, 3] }]);
        return item;
    }

}