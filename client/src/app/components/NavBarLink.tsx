import Image from "next/image";
import Link from "next/link";

interface MyComponentProps {
  linkAddress?: string;
  image: string;
  imageAlt: string;
}

const NavBarLink: React.FC<MyComponentProps> = ({
  linkAddress,
  image,
  imageAlt,
}) => {
  const imageElement = (
    <Image src={image} width={25} height={25} alt={imageAlt} />
  );

  return (
    <span className="mx-2 flex flex-shrink-0 items-center justify-center opacity-40 transition hover:scale-110 hover:opacity-50 active:opacity-60">
      {linkAddress ? (
        <Link href={linkAddress}> {imageElement} </Link>
      ) : (
        imageElement
      )}
    </span>
  );
};

export default NavBarLink;
