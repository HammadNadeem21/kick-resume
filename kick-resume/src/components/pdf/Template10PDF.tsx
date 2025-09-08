
import { Page, Text, View, Document, StyleSheet, Link } from "@react-pdf/renderer";
import type { PageProps } from "@react-pdf/renderer";

// Helper function to split an array into N columns
function splitIntoColumns(arr: any[], numCols: number) {
    const cols: any[][] = Array.from({ length: numCols }, () => []);
    arr.forEach((item, idx) => {
        cols[idx % numCols].push(item);
    });
    return cols;
}

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
    headingContainer: {
        // backgroundColor: '#d9d9d9',
        paddingVertical: 2,
        paddingHorizontal: 12,
        borderRadius: 9999, // full rounded
        alignSelf: 'flex-start', // to make it fit content
        marginBottom: 6,
    },
    headingText: {
        fontSize: 14, // Adjusted from md:text-xl / text-lg in HTML
        fontStyle: 'italic',
        fontWeight: 'bold',
        color: '#373643',
        textTransform: 'uppercase',
    },
    name: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#1f2937",
        textAlign: 'left',
        marginBottom: 0,

    },
    role: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#111",
        textAlign: 'left',
        marginTop: 2,
        marginBottom: 8,
    },
    contactRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
        // alignItems: 'center',
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
        fontSize: 11,
        marginTop: -1,
    },
    // Modified for 2-column education
    eduColumns: {
        flexDirection: 'row',
        width: '100%',
        marginTop: 4,
        gap: 12,
    },
    eduCol: {
        flex: 1,
        flexDirection: 'column',
        gap: 2,
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
    // Modified for 3-column skills
    skillsColumns: {
        flexDirection: 'row',
        width: '100%',
        marginTop: 2,
        marginBottom: 2,
        gap: 8,
    },
    skillsCol: {
        flex: 1,
        flexDirection: 'column',
        gap: 2,
    },
    skillRow: {
        flexDirection: 'row',
        alignItems: 'center',
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
        marginLeft: 18,
    },
    certLangCol: {
        width: '50%',
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 6,
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

export default function Template10PDF({ data, color, size }: { data: any, color: any, size: PageProps["size"] }) {
    // Split education and skills into columns
    const eduColumns = splitIntoColumns(data.education || [], 2);
    const skillColumns = splitIntoColumns(data.skills || [], 3);

    return (
        <Document>
            <Page size={size} style={styles.page}>
                {/* Header */}
                <View style={{ marginBottom: 8 }}>
                    <Text style={{ ...styles.name, textAlign: 'center' }}>{data.name}</Text>
                    <Text style={{ ...styles.role, textAlign: 'center' }}>{data.role}</Text>
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
                {/* Summary */}
                <View style={styles.section}>
                    <View style={{ ...styles.headingContainer, width: '100%', backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, 0.5)` }}>
                        <Text style={{...styles.headingText, color: `rgba(${color.r}, ${color.g}, ${color.b}, 1)`}}>SUMMARY</Text>
                    </View>
                    <Text style={styles.summaryText}>{data.summary}</Text>
                </View>
                {/* Experience */}
                {data.experience.length > 0 && (
                    <View style={styles.section}>
                        <View style={{ ...styles.headingContainer, width: '100%', backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, 0.5)` }}>
                            <Text style={{...styles.headingText, color: `rgba(${color.r}, ${color.g}, ${color.b}, 1)`}}>EXPERIENCE</Text>
                        </View>
                        <View style={{ marginTop: 4 }}>
                            {data.experience.map((item: any, i: number) => (
                                <View key={i} style={styles.expBlock}>
                                    <View style={styles.expHeader}>
                                        <View style={styles.expTitleCompany}>
                                            <Text style={styles.expTitle}>{item.title}</Text>
                                            <Text style={styles.expCompany}>{item.companyName}</Text>
                                        </View>
                                        <Text style={styles.expDates}>{`(${item.startDate} ${item.endDate})`}</Text>
                                    </View>
                                    {item.description && (
                                        <View style={styles.expDescList}>
                                            <View style={styles.expDescItem}>
                                                <Text style={styles.bullet}>•</Text>
                                                <Text style={styles.text}>{item.description}</Text>
                                            </View>
                                        </View>
                                    )}
                                </View>
                            ))}
                        </View>
                    </View>
                )}

                {/* Education - 2 columns */}
                {data.education.length > 0 && (
                    <View style={styles.section}>
                        <View style={{ ...styles.headingContainer, width: '100%',  backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, 0.5)` }}>
                            <Text style={{...styles.headingText, color: `rgba(${color.r}, ${color.g}, ${color.b}, 1)`}}>EDUCATION</Text>
                        </View>
                        <View style={styles.eduColumns}>
                            {eduColumns.map((col, colIdx) => (
                                <View key={colIdx} style={styles.eduCol}>
                                    {col.map((item: any, i: number) => (
                                        <View key={i} style={styles.eduRow}>
                                            <Text style={styles.bullet}>•</Text>
                                            <Text style={styles.eduDegree}>{item.degree}</Text>
                                            {(item.startDate && item.endDate) && (
                                                <Text style={styles.eduDates}>{`(${item.startDate} ${item.endDate})`}</Text>
                                            )}
                                        </View>
                                    ))}
                                </View>
                            ))}
                        </View>
                    </View>
                )}

                {/* Skills - 3 columns */}
                {data.skills.length > 0 && (
                    <View style={styles.section}>
                        <View style={{ ...styles.headingContainer, width: '100%',  backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, 0.5)` }}>
                            <Text style={{...styles.headingText, color: `rgba(${color.r}, ${color.g}, ${color.b}, 1)`}}>SKILLS</Text>
                        </View>
                        <View style={styles.skillsColumns}>
                            {skillColumns.map((col, colIdx) => (
                                <View key={colIdx} style={styles.skillsCol}>
                                    {col.map((item: any, i: number) => (
                                        <View key={i} style={styles.skillRow}>
                                            <Text style={styles.certLangBullet}>•</Text>
                                            <Text style={styles.certLangText}>{item}</Text>
                                        </View>
                                    ))}
                                </View>
                            ))}
                        </View>
                    </View>
                )}

                {/* Additional Information: Certifications and Languages */}
                {(data.certifications.length > 0 && data.languages.length > 0) && (
                    <View style={styles.section}>
                        <View style={{ ...styles.headingContainer, width: '100%', backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, 0.5)` }}>
                            <Text style={{...styles.headingText, color: `rgba(${color.r}, ${color.g}, ${color.b}, 1)`}}>ADDITIONAL INFORMATION</Text>
                        </View>
                        <View style={styles.certLangRow}>
                            {data.languages.length > 0 && (
                                <View style={{ width: '50%' }}>
                                    <Text style={styles.label}>Languages:</Text>
                                    {data.languages.map((item: any, i: number) => (
                                        <View key={i} style={styles.certLangCol}>
                                            <Text style={styles.certLangBullet}>•</Text>
                                            <Text style={styles.certLangText}>{item}</Text>
                                        </View>
                                    ))}
                                </View>
                            )}

                            {data.certifications.length > 0 && (
                                <View style={{ width: '50%' }}>
                                    <Text style={styles.label}>Certifications:</Text>
                                    {data.certifications.map((item: any, i: number) => (
                                        <View key={i} style={styles.certLangCol}>
                                            <Text style={styles.certLangBullet}>•</Text>
                                            <Text style={styles.certLangText}>{item}</Text>
                                        </View>
                                    ))}
                                </View>
                            )}

                        </View>
                    </View>
                )}

                {/* Projects */}
                {data.projects.length > 0 && (
                    <View style={styles.section}>
                        <View style={{ ...styles.headingContainer, width: '100%', backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, 0.5)` }}>
                            <Text style={{...styles.headingText, color: `rgba(${color.r}, ${color.g}, ${color.b}, 1)`}}>PROJECTS</Text>
                        </View>
                        <View style={{ marginTop: 4 }}>
                            {data.projects.map((item: any, i: number) => (
                                <View key={i} style={styles.projectBlock}>
                                    <View style={styles.projectHeader}>
                                        <Text style={styles.bullet}>•</Text>
                                        <Text style={styles.projectName}>{item.name}</Text>
                                    </View>
                                    <Text style={styles.projectDesc}>{item.description}</Text>
                                    {(item.github && item.live) && (
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
                )}

            </Page>
        </Document>
    );
}
