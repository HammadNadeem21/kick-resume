
import { Page, Text, View, Document, StyleSheet, Link } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
        padding: 28,
        fontSize: 12,
        fontFamily: "Helvetica",
        flexDirection: "column",
        backgroundColor: "#fff",
    },
    section: {
        marginBottom: 12,
    },
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: "#a1a1aa",
        marginVertical: 12,
    },
    heading: {
        fontSize: 16,
        marginBottom: 4,
        fontWeight: "bold",
        textAlign: "center",
        color: "#334155",
    },
    subHeading: {
        fontSize: 14,
        fontWeight: "semibold",
        textAlign: "center",
        color: "#475569",
    },
    text: {
        fontSize: 10,
        color: "#1f2937",
    },
    boldText: {
        fontWeight: "bold",
        fontSize: 10,
        color: "#1f2937",
    },
    listItem: {
        fontSize: 10,
        marginBottom: 2,
    },
    link: {
        fontSize: 10,
        color: '#2563eb',
        textDecoration: 'underline',
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    spaceBetween: {
        justifyContent: 'space-between',
    },
    gap10: {
        gap: 10,
    },
    gap5: {
        gap: 5,
    },
    gap2: {
        gap: 2,
    },
    textCenter: {
        textAlign: "center",
    }
});


export default function Template5PDF({ data }: { data: any }) {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.textCenter}>
                    <Text style={{ fontSize: 24, fontWeight: "bold", color: "#1f2937", marginBottom: 5 }}>{data.name}</Text>
                    <Text style={{ fontSize: 18, fontWeight: "semibold", color: "#374151", marginBottom: 10 }}>{data.role}</Text>
                </View>

                <View style={[styles.flexRow, styles.gap10, styles.textCenter, { justifyContent: 'center', marginBottom: 10 }]}>
                    <View style={[styles.flexRow, styles.gap2]}>
                        <Text style={styles.boldText}>Email: </Text>
                        <Text style={styles.text}>{data.email}</Text>
                    </View>
                    <View style={[styles.flexRow, styles.gap2]}>
                        <Text style={styles.boldText}>Phone: </Text>
                        <Text style={styles.text}>{`+${data.phone}`}</Text>
                    </View>
                    <View style={[styles.flexRow, styles.gap2]}>
                        <Text style={styles.boldText}>Address: </Text>
                        <Text style={styles.text}>{data.address}</Text>
                    </View>
                </View>

                <View style={styles.divider} />

                {/* Summary */}
                <View style={styles.section}>
                    <Text style={styles.heading}>Summary</Text>
                    <Text style={[styles.text, { marginTop: 8 }]}>
                        {data.summary}
                    </Text>
                </View>

                <View style={styles.divider} />

                {/* Experience */}
                <View style={styles.section}>
                    <Text style={styles.heading}>Experience</Text>
                    <View style={{ marginTop: 12 }}>
                        {data.experience.map((item: any, i: number) => (
                            <View key={i} style={{ marginBottom: 12 }}>
                                <View style={[styles.flexRow, styles.spaceBetween]}>
                                    <View>
                                        <Text style={{ fontSize: 12, fontWeight: "bold" }}>{item.companyName}</Text>
                                        <Text style={{ fontSize: 11 }}>{item.title}</Text>
                                    </View>
                                    <Text style={{ fontSize: 9 }}>{`(${item.startDate} - ${item.endDate})`}</Text>
                                </View>
                                <Text style={[styles.listItem, { marginTop: 4 }]}>{item.description}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                <View style={styles.divider} />

                {/* Education */}
                <View style={styles.section}>
                    <Text style={styles.heading}>Education</Text>
                    <View style={{ marginTop: 12, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                        {data.education.map((item: any, i: number) => (
                            <View key={i} style={{ width: '48%', marginBottom: 5 }}>
                                <Text style={styles.listItem}>• {item.degree}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                <View style={styles.divider} />

                {/* Skills */}
                <View style={styles.section}>
                    <Text style={styles.heading}>Skills</Text>
                    <View style={{ marginTop: 12, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                        {data.skills.map((item: string, i: number) => (
                            <View key={i} style={{ width: '30%', marginBottom: 5 }}>
                                <Text style={styles.listItem}>• {item}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                <View style={styles.divider} />

                {/* Certifications */}
                <View style={styles.section}>
                    <Text style={styles.heading}>Certifications</Text>
                    <View style={{ marginTop: 12, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                        {data.certifications.map((item: any, i: number) => (
                            <View key={i} style={{ width: '48%', marginBottom: 5 }}>
                                <Text style={styles.listItem}>• {item}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                <View style={styles.divider} />

                {/* Projects */}
                <View style={styles.section}>
                    <Text style={styles.heading}>Projects</Text>
                    <View style={{ marginTop: 12 }}>
                        {data.projects.map((item: any, i: number) => (
                            <View key={i} style={{ marginBottom: 12 }}>
                                <Text style={{ fontSize: 12, fontWeight: "semibold" }}>{item.name}</Text>
                                <Text style={[styles.text, { marginTop: 4 }]}>{item.description}</Text>
                                <View style={[styles.flexRow, styles.gap10, { marginTop: 5 }]}>
                                    {item.github && (
                                        <Link src={item.github} style={styles.link}>GitHub</Link>
                                    )}
                                    {item.live && (
                                        <Link src={item.live} style={styles.link}>Live Demo</Link>
                                    )}
                                </View>
                            </View>
                        ))}
                    </View>
                </View>

            </Page>
        </Document>
    );
}

