import React, { useState, useEffect } from 'react';
import { FormattedMessage } from "react-intl";
import './bandas.css';

function Bandas() {
  const apiUrl =
    'https://gist.githubusercontent.com/josejbocanegra/806a4dcd1af61b4cc498d24c52e84320/raw/8711b7af9091d2831ed043563cad2a61311b0a5f/music-bands.json';
  const [data, setData] = useState([]);
  const [masAntigua, setMasAntigua] = useState(2000);
  const [bandaSeleccionada, setBandaSeleccionada] = useState(null);

  useEffect(() => {
    // Realiza la solicitud fetch para cargar los datos desde una URL externa
    fetch(apiUrl)
      .then((response) => response.json())
      .then((jsonData) => {
        setData(jsonData);
        calcularMasAntigua(jsonData);
      })
      .catch((error) => console.error('Error fetching data: ', error));
  }, []);

  const calcularMasAntigua = (bandas) => {
    bandas.forEach((banda) => {
      const diferencia = 2022 - banda.foundation_year;
      if (diferencia < masAntigua) {
        setMasAntigua(diferencia);
      }
    });
  };

  function handleClick(banda) {
    setBandaSeleccionada(banda);
  }

  return (
    <div >
      <header className='header' >
        <FormattedMessage id="Bandas musicales"/>
        </header>
    <div className="row align-items-start App">
      <div className="col">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th><FormattedMessage id="Nombre"/></th>
              <th><FormattedMessage id="Pais"/></th>
              <th><FormattedMessage id="Genéro"/></th>
              <th><FormattedMessage id="Fundación"/></th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td className={item.id} onClick={() => handleClick(item)}>
                  {item.id}
                </td>
                <td className='name' onClick={() => handleClick(item)}>{item.name}</td>
                <td onClick={() => handleClick(item)}>{item.country}</td>
                <td onClick={() => handleClick(item)}>{item.genre}</td>
                <td onClick={() => handleClick(item)}>{item.foundation_year}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className='filtro'><FormattedMessage id="La banda más antigua se fundó hace"/> {masAntigua} <FormattedMessage id="años"/>.</p>
      </div>
      <div className="col">
        {bandaSeleccionada && (
          <div className="card" style={{ width: '18rem' }}>
            <div className="card-body">
              <img src="https://raw.githubusercontent.com/Uniandes-isis2603/recursos-isis2603/master/images/202220/p2_v3/Queen.jpg" alt="Imagen de Queen" alt="Imagen de la banda" />
              <h5 className="card-title">{bandaSeleccionada.name}</h5>
              <p className="card-text">{bandaSeleccionada.description}</p>
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}

export default Bandas;
