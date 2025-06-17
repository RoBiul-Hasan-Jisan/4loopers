import { useParams } from 'react-router-dom';

function MovieDetails() {
  const { id } = useParams();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Movie Details - {id}</h1>
    </div>
  );
}

export default MovieDetails;
