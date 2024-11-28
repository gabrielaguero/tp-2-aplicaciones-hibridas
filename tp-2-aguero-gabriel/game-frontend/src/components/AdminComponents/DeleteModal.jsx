import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const DeleteModal = ({ game, onClose, onDelete }) => {
  const handleDelete = async () => {
    try {
      const token = Cookies.get('jwToken'); 
      if (!token) {
        console.error('Token no encontrado.');
        return;
      }

      console.log('Eliminando juego con ID:', game._id); // Debug
      await axios.delete(`http://localhost:3002/games/${game._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onDelete();
      onClose(); 
    } catch (error) {
      console.error('Error al eliminar el videojuego:', error.response?.data || error.message);
    }
  };

  return (
    <div className="modal d-block">
      <div className="modal-dialog">
        <div className="modal-content bg-black text-white">
          <div className="modal-header">
            <h3 className="modal-title text-danger">Confirmar Eliminación</h3>
            <button type="button" className="btn-close bg-danger" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p>¿Estás seguro de que deseas eliminar el videojuego "{game.name}"?</p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-danger d-block mx-auto" onClick={handleDelete}>
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
