const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {

    id : {
      type : DataTypes.UUID,
      defaultValue : DataTypes.UUIDV4,
      allowNull : false,
      primaryKey: true
      
    },
    
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },

    height: {
      type : DataTypes.STRING,
      allowNull : false
    } ,

    weight: {
      type: DataTypes.STRING,
      allowNull: false

},

  lifeTime: {
      type: DataTypes.STRING,
      allowNull: false
},

  image : {
    type :DataTypes.STRING,
    defaultValue: 'https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/styles/hc_720x405/public/media/image/2016/12/simpson-2x16.jpg?itok=s7SbAp_r'
  },

  createdInDb : {
   type:  DataTypes.BOOLEAN,
   allowNull : false,
   defaultValue : true
  }
  },
  {timestamps : false} 
  );

};
// 