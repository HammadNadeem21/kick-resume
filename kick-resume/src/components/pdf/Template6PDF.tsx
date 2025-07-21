
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
        marginBottom: 8,
    },
    divider: {
        borderBottomWidth: 2,
        borderBottomColor: "#000",
        marginVertical: 10,
    },
    heading: {
        fontSize: 15,
        marginBottom: 4,
        fontWeight: "bold",
        textAlign: "left",
        color: "#1f2937",
    },
    blueHeading: {
        fontSize: 13,
        fontWeight: "bold",
        color: "#3b82f6",
        textAlign: "left",
        marginBottom: 2,
    },
    text: {
        fontSize: 10,
        color: "#1f2937",
        lineHeight: 1.3,
    },
    summaryText: {
        fontSize: 10,
        color: "#1f2937",
        lineHeight: 1.5,
    },
    boldText: {
        fontWeight: "bold",
        fontSize: 10,
        color: "#1f2937",
    },
    label: {
        fontWeight: "bold",
        fontSize: 10,
        color: "#1f2937",
        marginRight: 2,
    },
    contactRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 18,
        marginBottom: 8,
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
    },
    listItem: {
        fontSize: 10,
        marginBottom: 2,
    },
    underline: {
        // textDecoration: 'underline',
        textDecorationStyle: 'solid',
        textDecorationColor: '#000',
        textUnderlineOffset: 8,
    },
    projectLinks: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 18,
        marginTop: 4,
    },
    projectLink: {
        fontSize: 10,
        color: '#2563eb',
        textDecoration: 'underline',
    },
    expCompany: {
        color: '#3b82f6',
        fontWeight: 'bold',
        fontSize: 11,
    },
    expTitle: {
        fontSize: 10,
        color: '#1f2937',
    },
    expDates: {
        fontSize: 9,
        color: '#64748b',
    },
    expDesc: {
        fontSize: 10,
        color: '#1f2937',
        marginTop: 2,
    },
    eduRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 2,
    },
    eduDegree: {
        fontSize: 10,
        color: '#1f2937',
    },
    eduDates: {
        fontSize: 9,
        color: '#3b82f6',
    },
    certRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 2,
    },
    certText: {
        fontSize: 10,
        color: '#1f2937',
    },
});


export default function Template6PDF({ data }: { data: any }) {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={{ marginBottom: 8 }}>
                    <Text style={{ fontSize: 24, fontWeight: "bold", color: "#1f2937", textAlign: 'left' }}>{data.name}</Text>
                    <Text style={{ fontSize: 15, fontWeight: "bold", color: "#3b82f6", textAlign: 'left', marginTop: 2 }}>{data.role}</Text>
                </View>
                {/* Contact Info */}
                <View style={styles.contactRow}>
                    <View style={styles.contactItem}>
                        <Text style={styles.label}>Email:</Text>
                        <Text style={styles.text}>{data.email}</Text>
                    </View>
                    <View style={styles.contactItem}>
                        <Text style={styles.label}>Phone:</Text>
                        <Text style={styles.text}>{`+${data.phone}`}</Text>
                    </View>
                    <View style={styles.contactItem}>
                        <Text style={styles.label}>Address:</Text>
                        <Text style={styles.text}>{data.address}</Text>
                    </View>
                </View>
                <View style={styles.divider} />
                {/* Summary */}
                <View style={styles.section}>
                    <Text style={styles.heading}>Summary</Text>
                    <Text style={styles.summaryText}>{data.summary}</Text>
                </View>
                <View style={styles.divider} />
                {/* Experience */}
                <View style={styles.section}>
                    <Text style={styles.heading}>Experience</Text>
                    <View style={{ marginTop: 4 }}>
                        {data.experience.map((item: any, i: number) => (
                            <View key={i} style={{ marginBottom: 10 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <View>
                                        <Text style={styles.expCompany}>{item.companyName}</Text>
                                        <Text style={styles.expTitle}>{item.title}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', gap: 2 }}>
                                        <Text style={styles.expDates}>{`(${item.startDate}`}</Text>
                                        <Text style={styles.expDates}>{`${item.endDate})`}</Text>
                                    </View>
                                </View>
                                <Text style={styles.expDesc}>{item.description}</Text>
                            </View>
                        ))}
                    </View>
                </View>
                <View style={styles.divider} />
                {/* Education */}
                <View style={styles.section}>
                    <Text style={styles.heading}>Education</Text>
                    <View style={{ marginTop: 4 }}>
                        {data.education.map((item: any, i: number) => (
                            <View key={i} style={styles.eduRow}>
                                <Text style={styles.eduDegree}>{item.degree}</Text>
                                {(item.startDate && item.endDate) && (
                                    <Text style={styles.eduDates}>{`(${item.startDate} - ${item.endDate})`}</Text>
                                )}
                            </View>
                        ))}
                    </View>
                </View>
                <View style={styles.divider} />
                {/* Skills */}
                <View style={styles.section}>
                    <Text style={styles.heading}>Skills</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 4 }}>
                        {data.skills.map((item: string, i: number) => (
                            <View key={i} style={{ borderBottomWidth: 1, borderBottomColor: 'black', borderStyle: 'solid' }}>
                                <Text  style={[styles.text, styles.underline]}>{item}</Text>
                            </View>
                        ))}
                    </View>
                </View>
                <View style={styles.divider} />
                {/* Certifications */}
                <View style={styles.section}>
                    <Text style={styles.heading}>Certifications</Text>
                    <View style={{ marginTop: 2 }}>
                        {data.certifications.map((item: any, i: number) => (
                            <View key={i} style={styles.certRow}>
                                <Text style={styles.certText}>{item}</Text>
                            </View>
                        ))}
                    </View>
                </View>
                <View style={styles.divider} />
                {/* Projects */}
                <View style={styles.section}>
                    <Text style={styles.heading}>Projects</Text>
                    <View style={{ marginTop: 4 }}>
                        {data.projects.map((item: any, i: number) => (
                            <View key={i} style={{ marginBottom: 10 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 11 }}>{item.name}</Text>
                                <Text style={styles.text}>{item.description}</Text>
                                {(item.github || item.live) && (
                                    <View style={styles.projectLinks}>
                                        {item.github && (
                                            <Link src={item.github} style={styles.projectLink}>GitHub</Link>
                                        )}
                                        {item.live && (
                                            <Link src={item.live} style={styles.projectLink}>Live Demo</Link>
                                        )}
                                    </View>
                                )}
                            </View>
                        ))}
                    </View>
                </View>
            </Page>
        </Document>
    );
}

