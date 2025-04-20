export default function MovieCard({ title, url  }: { title: string; url: string }) {
    return (
    <div 
        style={{
            width: "180px",
            height: "270px",
            overflow: "hidden",
            border: "4px solid red",
            borderRadius: "5px",
            transition: "transform 0.3s ease",
          }}
          className="movie-box">
            <img
              src={url}
              alt={`Theater poster of ${title}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>)
}