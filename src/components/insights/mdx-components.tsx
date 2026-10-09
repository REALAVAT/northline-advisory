import NextLink from "next/link";

type AnchorProps = React.ComponentProps<"a">;

function MdxLink({ href = "", children, ...props }: AnchorProps) {
  if (href.startsWith("/")) {
    return (
      <NextLink href={href} {...props}>
        {children}
      </NextLink>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}

function MdxTable(props: React.ComponentProps<"table">) {
  return (
    <div className="relative my-8 overflow-x-auto rounded-xl border border-border">
      <table {...props} className="!my-0" />
    </div>
  );
}

export const mdxComponents = {
  a: MdxLink,
  table: MdxTable,
};
