import { IconTrashCan } from "../icons/TrashCan";

interface Props {}

function MarketplaceItem(props: any) {
  return (
    <tr>
      <td className="text-left">{props.marketplace.name}</td>
      <td className="text-left">{props.marketplace.address}</td>
      <td>
        <IconTrashCan />
      </td>
    </tr>
  );
}

export default MarketplaceItem;
