
import { Page, Text, View, Document, StyleSheet, Link } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
        padding: 28,
        fontSize: 12,
        fontFamily: "Helvetica",
        flexDirection: "column",
        backgroundColor: "#f6f8fa",
    },
    section: {
        marginBottom: 12,
    },
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: "#222",
        marginVertical: 14,
    },
    heading: {
        fontSize: 13,
        marginBottom: 6,
        fontWeight: "bold",
        textAlign: "left",
        color: "#111",
        // letterSpacing: 1.2,
        textTransform: 'uppercase',
    },
    name: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#111",
        textAlign: 'left',
        marginBottom: 0,
    },
    role: {
        fontSize: 15,
        
        color: "#111",
        textAlign: 'left',
        marginTop: 2,
        marginBottom: 8,
    },
    contactRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 24,
        marginBottom: 8,
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
    },
    label: {
        fontWeight: "bold",
        fontSize: 11,
        color: "#111",
        marginRight: 2,
    },
    text: {
        fontSize: 11,
        color: "#222",
        lineHeight: 1.3,
    },
    summaryText: {
        fontSize: 11,
        color: "#222",
        lineHeight: 1.5,
    },
    expBlock: {
        marginBottom: 10,
    },
    expHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    expTitleCompany: {
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
    },
    expTitle: {
        fontWeight: 'bold',
        fontSize: 12,
        color: '#111',
        marginRight: 6,
    },
    expCompany: {
        fontWeight: 'bold',
        fontSize: 12,
        color: '#111',
    },
    expDates: {
        fontSize: 8,
        color: '#000',
        marginLeft: 2,
    },
    expDescList: {
        marginTop: 2,
        marginLeft: 12,
    },
    expDescItem: {
        fontSize: 11,
        color: '#222',
        marginBottom: 2,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    bullet: {
        color: '#222',
        marginRight: 6,
        fontSize: 13,
        marginTop: -1,
    },
    eduRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2,
    },
    eduDegree: {
        fontSize: 11,
        color: '#222',
    },
    eduDates: {
        fontSize: 8,
        color: '#000',
        marginLeft: 8,
    },
    skillsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 2,
        marginBottom: 2,
    },
    skillText: {
        fontSize: 11,
        color: '#222',
        marginRight: 6,
    },
    certLangRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 2,
        marginBottom: 2,
    },
    certLangCol: {
        width: '33%',
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 2,
    },
    certificationCol: {
        width: '50%',
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 2,
    },
    certLangBullet: {
        color: '#222',
        marginRight: 6,
        fontSize: 13,
        marginTop: -1,
    },
    certLangText: {
        fontSize: 11,
        color: '#222',
    },
    projectBlock: {
        marginBottom: 10,
    },
    projectHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    projectName: {
        fontWeight: 'bold',
        fontSize: 12,
        color: '#111',
        marginBottom: 2,
    },
    projectDesc: {
        fontSize: 11,
        color: '#222',
        marginBottom: 2,
    },
    projectLinks: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 24,
        marginTop: 2,
    },
    projectLink: {
        fontSize: 9,
        color: '#000',
        textDecoration: 'underline',
        marginRight: 18,
    },
});

export default function Template8PDF({ data }: { data: any }) {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={{ marginBottom: 8 }}>
                    <Text style={styles.name}>{data.name}</Text>
                    <Text style={styles.role}>{data.role}</Text>
                </View>
                {/* Contact Info */}
                <View style={styles.contactRow}>
                    <View style={styles.contactItem}>
                        <Text style={styles.label}>Phone:</Text>
                        <Text style={styles.text}>{`+${data.phone}`}</Text>
                    </View>
                    <View style={styles.contactItem}>
                        <Text style={styles.label}>Email:</Text>
                        <Text style={styles.text}>{data.email}</Text>
                    </View>
                    <View style={styles.contactItem}>
                        <Text style={styles.label}>Location:</Text>
                        <Text style={styles.text}>{data.address}</Text>
                    </View>
                </View>
                {/* <View style={styles.divider} /> */}
                {/* Summary */}
                <View style={styles.section}>
                    <Text style={styles.heading}>SUMMARY</Text>
                    <Text style={styles.summaryText}>{data.summary}</Text>
                </View>
                {/* <View style={styles.divider} /> */}
                {/* Experience */}
                <View style={styles.section}>
                    <Text style={styles.heading}>EXPERIENCE</Text>
                    <View style={{ marginTop: 4 }}>
                        {data.experience.map((item: any, i: number) => (
                            <View key={i} style={styles.expBlock}>
                                <View style={styles.expHeader}>
                                    <View style={styles.expTitleCompany}>
                                        <Text style={styles.expTitle}>{item.title}</Text>
                                        <Text style={styles.expCompany}>{item.companyName}</Text>
                                    </View>
                                    <Text style={styles.expDates}>{`(${item.startDate}  ${item.endDate})`}</Text>
                                </View>
                                {item.description && (
                                    <View style={styles.expDescList}>
                                        <View style={styles.expDescItem}>
                                            <Text style={styles.bullet}>•</Text>
                                            <Text>{item.description}</Text>
                                        </View>
                                    </View>
                                )}
                            </View>
                        ))}
                    </View>
                </View>
                {/* <View style={styles.divider} /> */}
                {/* Education */}
                <View style={styles.section}>
                    <Text style={styles.heading}>EDUCATION</Text>
                    <View style={{ marginTop: 4 }}>
                        {data.education.map((item: any, i: number) => (
                            <View key={i} style={styles.eduRow}>
                                <Text style={styles.bullet}>•</Text>
                                <Text style={styles.eduDegree}>{item.degree}</Text>
                                {(item.startDate && item.endDate) && (
                                    <Text style={styles.eduDates}>{`(${item.startDate} - ${item.endDate})`}</Text>
                                )}
                            </View>
                        ))}
                    </View>
                </View>
                {/* <View style={styles.divider} /> */}
                {/* Skills */}
                <View style={styles.section}>
                    <Text style={styles.heading}>SKILLS</Text>
                    <View style={styles.skillsRow}>
                        <Text style={styles.skillText}>{data.skills.join(", ")}</Text>
                    </View>
                </View>
                {/* <View style={styles.divider} /> */}
                {/* Certifications */}
                <View style={styles.section}>
                    <Text style={styles.heading}>CERTIFICATIONS</Text>
                    <View style={styles.certLangRow}>
                        {data.certifications.map((item: any, i: number) => (
                            <View key={i} style={styles.certificationCol}>
                                <Text style={styles.certLangBullet}>•</Text>
                                <Text style={styles.certLangText}>{item}</Text>
                            </View>
                        ))}
                    </View>
                </View>
                {/* <View style={styles.divider} /> */}
                {/* Languages */}
                <View style={styles.section}>
                    <Text style={styles.heading}>LANGUAGES</Text>
                    <View style={styles.certLangRow}>
                        {data.languages.map((item: any, i: number) => (
                            <View key={i} style={styles.certLangCol}>
                                <Text style={styles.certLangBullet}>•</Text>
                                <Text style={styles.certLangText}>{item}</Text>
                            </View>
                        ))}
                    </View>
                </View>
                {/* <View style={styles.divider} /> */}
                {/* Projects */}
                <View style={styles.section}>
                    <Text style={styles.heading}>PROJECTS</Text>
                    <View style={{ marginTop: 4 }}>
                        {data.projects.map((item: any, i: number) => (
                            <View key={i} style={styles.projectBlock}>
                                <View style={styles.projectHeader}>
                                    <Text style={styles.bullet}>•</Text>
                                    <Text style={styles.projectName}>{item.name}</Text>
                                </View>
                                <Text style={styles.projectDesc}>{item.description}</Text>
                                {(item.github || item.live) && (
                                    <View style={styles.projectLinks}>
                                        {item.github && (
                                            <Link src={item.github} style={styles.projectLink}>GitHub</Link>
                                        )}
                                        {item.live && (
                                            <Link src={item.live} style={styles.projectLink}>live demo</Link>
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

