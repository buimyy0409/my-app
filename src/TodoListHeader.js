const Header = ({ unfinishedTasksCount }) => {
  return (
    <div className="header">
      You have {unfinishedTasksCount} task{unfinishedTasksCount !== 1 && "s"}{" "}
      left!
    </div>
  );
};

export default Header;
