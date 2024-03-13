const handleClick = () => {
    window.location.href = "/login";
}
export function Homepage() {
  return (
    <div>
      <h1>Homepage</h1>
      <button onClick={handleClick}>Login page</button>
    </div>
  );
}
