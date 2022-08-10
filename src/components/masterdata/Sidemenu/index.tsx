import { Grid, Container, Row, Text, Spacer, Table, Link, Textarea, Button, Card, Loading, Modal, Input } from "@nextui-org/react"
import NextLink from "next/link"

export const Sidemenu = () => {
    return (
        <Container gap={0}>
            <NextLink href="/app/masterdata/">
                <Link>
                    <Text
                        h5
                        css={{
                            "&:hover": { color: "$primary" },
                        }}
                    >
                        Equipment Categories
                    </Text>
                </Link>
            </NextLink>
            <Spacer y={1} />
            <NextLink href="/app/masterdata/manufacturer">
                <Link>
                    <Text
                        h5
                        css={{
                            "&:hover": { color: "$primary" },
                        }}
                    >
                        Manufacturers
                    </Text>
                </Link>
            </NextLink>
            <Spacer y={1} />
            <NextLink href="/app/masterdata/location">
                <Link>
                    <Text
                        h5
                        css={{
                            "&:hover": { color: "$primary" },
                        }}
                    >
                        Locations
                    </Text>
                </Link>
            </NextLink>
            <Spacer y={1} />
            <NextLink href="/app/masterdata/products">
                <Link>
                    <Text
                        h5
                        css={{
                            "&:hover": { color: "$primary" },
                        }}
                    >
                        Products
                    </Text>
                </Link>
            </NextLink>
            <Spacer y={1} />
            <NextLink href="/app/masterdata/inspection-checklist">
                <Link>
                    <Text
                        h5
                        css={{
                            "&:hover": { color: "$primary" },
                        }}
                    >
                        Inspection Checklists
                    </Text>
                </Link>
            </NextLink>
        </Container>
    )
}
