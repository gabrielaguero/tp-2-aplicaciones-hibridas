import React, { useState, useEffect } from "react";

const WishList = () => {
  const [wishList, setWishList] = useState([]);

  useEffect(() => {
    const storedWishList = JSON.parse(localStorage.getItem("wishList")) || [];
    setWishList(storedWishList);
  }, []);

  const handleRemoveFromWishList = (gameId) => {
    const updatedWishList = wishList.filter((game) => game._id !== gameId);
    localStorage.setItem("wishList", JSON.stringify(updatedWishList));
    setWishList(updatedWishList);
    alert("Juego eliminado de la lista de deseos.");
  };

  return (
    <div className="container my-5">
      <h3 className="text-center mb-4 fs-3 fw-bold text-danger">Mi Lista de Deseos</h3>
      {wishList.length === 0 ? (
        <div className="text-center text-danger">No tienes juegos en tu lista de deseos.</div>
      ) : (
        <ul className="list-unstyled">
          {wishList.map((game) => (
            <li key={game._id} className="d-flex justify-content-between align-items-center bg-dark text-white p-3 mb-2 rounded">
              <div className="d-flex align-items-center">
                <img
                  src={game.cover}
                  alt={game.name}
                  style={{ width: "50px", height: "70px", objectFit: "cover", marginRight: "10px" }}
                />
                <span className="fw-bold">{game.name}</span>
              </div>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleRemoveFromWishList(game._id)}
                style={{ borderRadius: "50%", width: "30px", height: "30px" }}
              >
                X
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WishList;
