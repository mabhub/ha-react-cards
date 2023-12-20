const StdCard = ({ cardProps = {}, config = {}, ...props }) => (
  <ha-card
    header={config.title || 'Untitled'}
    {...cardProps}
  >
    <div className="card-content" {...props} />
  </ha-card>
);

export default StdCard;
