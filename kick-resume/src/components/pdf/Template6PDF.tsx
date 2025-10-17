// import { Page, Text, View, Document, StyleSheet, Link } from "@react-pdf/renderer";
// import type { PageProps } from "@react-pdf/renderer";

// const styles = StyleSheet.create({
//     page: {
//         padding: 28,
//         fontSize: 12,
//         fontFamily: "Helvetica",
//         flexDirection: "column",
//         backgroundColor: "#fff",
//     },
//     section: {
//         marginBottom: 8,
//     },
//     divider: {
//         borderBottomWidth: 2,
//         borderBottomColor: "#000",
//         marginVertical: 10,
//     },
//     heading: {
//         fontSize: 15,
//         marginBottom: 4,
//         fontWeight: "bold",
//         textAlign: "left",
//         color: "#1f2937",
//     },
//     blueHeading: {
//         fontSize: 13,
//         fontWeight: "bold",
//         color: "#3b82f6",
//         textAlign: "left",
//         marginBottom: 2,
//     },
//     text: {
//         fontSize: 10,
//         color: "#1f2937",
//         lineHeight: 1.3,
//     },
//     summaryText: {
//         fontSize: 10,
//         color: "#1f2937",
//         lineHeight: 1.5,
//     },
//     boldText: {
//         fontWeight: "bold",
//         fontSize: 10,
//         color: "#1f2937",
//     },
//     label: {
//         fontWeight: "bold",
//         fontSize: 10,
//         color: "#1f2937",
//         marginRight: 2,
//     },
//     contactRow: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         gap: 18,
//         marginBottom: 8,
//     },
//     contactItem: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         gap: 2,
//     },
//     listItem: {
//         fontSize: 10,
//         marginBottom: 2,
//     },
//     underline: {
//         // textDecoration: 'underline',
// textDecorationStyle: 'solid',
// textDecorationColor: '#000',
// textUnderlineOffset: 8,
//     },
//     projectLinks: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         gap: 18,
//         marginTop: 4,
//     },
//     projectLink: {
//         fontSize: 10,
//         color: '#2563eb',
//         textDecoration: 'underline',
//     },
//     expCompany: {
//         color: '#3b82f6',
//         fontWeight: 'bold',
//         fontSize: 11,
//     },
//     expTitle: {
//         fontSize: 10,
//         color: '#1f2937',
//     },
//     expDates: {
//         fontSize: 9,
//         color: '#64748b',
//     },
//     expDesc: {
//         fontSize: 10,
//         color: '#1f2937',
//         marginTop: 2,
//     },
//     eduRow: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         gap: 8,
//         marginBottom: 2,
//     },
//     eduDegree: {
//         fontSize: 10,
//         color: '#1f2937',
//     },
//     eduDates: {
//         fontSize: 9,
//         color: '#3b82f6',
//     },
//     certRow: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         gap: 6,
//         marginBottom: 2,
//     },
//     certText: {
//         fontSize: 10,
//         color: '#1f2937',
//     },
// });

// export default function Template6PDF({ data, size }: { data: any, size: PageProps["size"] }) {
//     return (
//         <Document>
//             <Page size={size} style={styles.page}>
//                 {/* Header */}
//                 <View style={{ marginBottom: 8 }}>
//                     <Text style={{ fontSize: 24, fontWeight: "bold", color: "#1f2937", textAlign: 'left' }}>{data.name}</Text>
//                     <Text style={{ fontSize: 15, fontWeight: "bold", color: "#3b82f6", textAlign: 'left', marginTop: 2 }}>{data.role}</Text>
//                 </View>
//                 {/* Contact Info */}
//                 <View style={styles.contactRow}>
//                     <View style={styles.contactItem}>
//                         <Text style={styles.label}>Email:</Text>
//                         <Text style={styles.text}>{data.email}</Text>
//                     </View>
//                     <View style={styles.contactItem}>
//                         <Text style={styles.label}>Phone:</Text>
//                         <Text style={styles.text}>{`+${data.phone}`}</Text>
//                     </View>
//                     <View style={styles.contactItem}>
//                         <Text style={styles.label}>Address:</Text>
//                         <Text style={styles.text}>{data.address}</Text>
//                     </View>
//                 </View>
//                 <View style={styles.divider} />
//                 {/* Summary */}
//                 <View style={styles.section}>
//                     <Text style={styles.heading}>Summary</Text>
//                     <Text style={styles.summaryText}>{data.summary}</Text>
//                 </View>
//                 <View style={styles.divider} />
//                 {/* Experience */}
//                 <View style={styles.section}>
//                     <Text style={styles.heading}>Experience</Text>
//                     <View style={{ marginTop: 4 }}>
//                         {data.experience.map((item: any, i: number) => (
//                             <View key={i} style={{ marginBottom: 10 }}>
//                                 <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
//                                     <View>
//                                         <Text style={styles.expCompany}>{item.companyName}</Text>
//                                         <Text style={styles.expTitle}>{item.title}</Text>
//                                     </View>
//                                     <View style={{ flexDirection: 'row', gap: 2 }}>
//                                         <Text style={styles.expDates}>{`(${item.startDate}`}</Text>
//                                         <Text style={styles.expDates}>{`${item.endDate})`}</Text>
//                                     </View>
//                                 </View>
//                                 <Text style={styles.expDesc}>{item.description}</Text>
//                             </View>
//                         ))}
//                     </View>
//                 </View>
//                 <View style={styles.divider} />
//                 {/* Education */}
//                 <View style={styles.section}>
//                     <Text style={styles.heading}>Education</Text>
//                     <View style={{ marginTop: 4 }}>
//                         {data.education.map((item: any, i: number) => (
//                             <View key={i} style={styles.eduRow}>
//                                 <Text style={styles.eduDegree}>{item.degree}</Text>
//                                 {(item.startDate && item.endDate) && (
//                                     <Text style={styles.eduDates}>{`(${item.startDate} - ${item.endDate})`}</Text>
//                                 )}
//                             </View>
//                         ))}
//                     </View>
//                 </View>
//                 <View style={styles.divider} />
//                 {/* Skills */}
//                 <View style={styles.section}>
//                     <Text style={styles.heading}>Skills</Text>
//                     <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 4 }}>
//                         {data.skills.map((item: string, i: number) => (
//                             <View key={i} style={{ borderBottomWidth: 1, borderBottomColor: 'black', borderStyle: 'solid' }}>
//                                 <Text  style={[styles.text, styles.underline]}>{item}</Text>
//                             </View>
//                         ))}
//                     </View>
//                 </View>
//                 <View style={styles.divider} />
//                 {/* Certifications */}
//                 <View style={styles.section}>
//                     <Text style={styles.heading}>Certifications</Text>
//                     <View style={{ marginTop: 2 }}>
//                         {data.certifications.map((item: any, i: number) => (
//                             <View key={i} style={styles.certRow}>
//                                 <Text style={styles.certText}>{item}</Text>
//                             </View>
//                         ))}
//                     </View>
//                 </View>
//                 <View style={styles.divider} />
//                 {/* Projects */}
//                 <View style={styles.section}>
//                     <Text style={styles.heading}>Projects</Text>
//                     <View style={{ marginTop: 4 }}>
//                         {data.projects.map((item: any, i: number) => (
//                             <View key={i} style={{ marginBottom: 10 }}>
//                                 <Text style={{ fontWeight: 'bold', fontSize: 11 }}>{item.name}</Text>
//                                 <Text style={styles.text}>{item.description}</Text>
//                                 {(item.github || item.live) && (
//                                     <View style={styles.projectLinks}>
//                                         {item.github && (
//                                             <Link src={item.github} style={styles.projectLink}>GitHub</Link>
//                                         )}
//                                         {item.live && (
//                                             <Link src={item.live} style={styles.projectLink}>Live Demo</Link>
//                                         )}
//                                     </View>
//                                 )}
//                             </View>
//                         ))}
//                     </View>
//                 </View>
//             </Page>
//         </Document>
//     );
// }

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";
import type { PageProps } from "@react-pdf/renderer";
import moment from "moment";

const styles = StyleSheet.create({
  page: {
    paddingVertical: 22,
    paddingHorizontal: 16,
    fontSize: 12,
    fontFamily: "Helvetica",
    flexDirection: "column",
    backgroundColor: "#fff",
  },
  section: {
    marginBottom: 0,
  },
  divider: {
    borderBottomWidth: 2,
    borderBottomColor: "#000",
    marginVertical: 8,
  },
  heading: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: "bold",
    textAlign: "left",
    color: "#1f2937", // gray-800
  },
  text: {
    fontSize: 10,
    color: "#000",
  },
  summaryText: {
    fontSize: 10,
    color: "#000",
    lineHeight: 1.5,
    marginTop: 2,
  },
  boldText: {
    fontWeight: "bold",
    fontSize: 10,
    textTransform: "capitalize",
  },
  personalInfoContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 8,
    marginTop: 8,
  },
  personalInfoItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 4,
    fontSize: 10,
    color: "#6b7280", // gray-500
  },
  bullet: {
    fontSize: 10,
    marginRight: 6,
  },
  experienceItem: {
    marginBottom: 12,
    paddingLeft: 12,
    marginTop: 12,
  },
  projectItem: {
    marginBottom: 20,
    paddingLeft: 12,
    marginTop: 12,
  },
  educationGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingLeft: 20,
    marginTop: 12,
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginTop: 12,
    paddingLeft: 20,
  },
  certificationsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingLeft: 20,
    marginTop: 4,
  },
  underlinedText: {
    textDecoration: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "#000",
    textUnderlineOffset: 10,
    fontSize: 10,
    color: "#000",
  },
  blueText: {
    color: "#3b82f6", // blue-500
  },
  linkText: {
    fontSize: 10,
    color: "#3b82f6",
    textDecoration: "underline",
  },
});

export default function Template6PDF({
  data,
  size,
}: {
  data: any;
  size: PageProps["size"];
}) {
  return (
    <Document>
      <Page size={size} style={styles.page}>
        {/* Header - Name and Role */}
        <View style={{ marginBottom: 8 }}>
          <Text
            style={{
              fontSize: 28,
              fontWeight: "bold",
              color: "#1f2937",
              textAlign: "left",
            }}
          >
            {data.name}
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: "#3b82f6",
              textAlign: "left",
              marginTop: 4,
            }}
          >
            {data.role}
          </Text>
        </View>

        {/* Personal Information */}
        {data.personalInformation && data.personalInformation.length > 0 ? (
          <View style={styles.personalInfoContainer}>
            {data.personalInformation.map((item: any, idx: number) => (
              <View
                key={idx}
                style={{
                  flexDirection: "row",
                  gap: 4,
                  fontSize: 10,
                  color: "#6b7280",
                }}
              >
                <Text style={styles.boldText}>{item.title}:</Text>
                <Text style={{ fontSize: 9, marginTop: 1 }}>{item.value}</Text>
              </View>
            ))}
          </View>
        ) : null}

        {/* Summary */}
        <View style={[styles.section, { marginTop: 6 }]}>
          <Text style={styles.heading}>Summary</Text>
          <Text style={styles.summaryText}>{data.summary}</Text>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Experience */}
        <View style={styles.section}>
          <Text style={styles.heading}>Experience</Text>

          <View style={{ paddingLeft: 12, marginTop: 12 }}>
            {data.experience.map((item: any, i: number) => (
              <View key={i} style={{ marginBottom: 12 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <View style={{ gap: 4 }}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "bold",
                        color: "#3b82f6",
                      }}
                    >
                      {item.companyName}
                    </Text>
                    <Text style={{ fontSize: 10, color: "#000" }}>
                      {item.title}
                    </Text>
                  </View>
                  <Text style={{ fontSize: 8 }}>
                    {`(${moment(item.startDate).format("MMM YYYY")} - ${
                      item.endDate === "Currently working"
                        ? "Currently working"
                        : moment(item.endDate).isValid()
                        ? moment(item.endDate).format("MMM YYYY")
                        : ""
                    })`}
                  </Text>
                </View>
                <View style={{ flexDirection: "row", marginTop: 4 }}>
                  <Text style={styles.bullet}>•</Text>
                  <Text
                    style={{
                      fontSize: 10,
                      flex: 1,
                      color: "#000",
                      lineHeight: 1.5,
                    }}
                  >
                    {item.description}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <>
            <View style={styles.divider} />
            <View style={styles.section}>
              <Text style={styles.heading}>Education</Text>
              <View style={styles.educationGrid}>
                {data.education.map((item: any, i: number) => (
                  <View key={i} style={{ width: "48%", marginBottom: 8 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <View style={{ flexDirection: "row" }}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={{ fontSize: 10, color: "#000" }}>
                          {item.degree}
                        </Text>
                      </View>
                      {item.startDate && item.endDate && (
                        <Text
                          style={{
                            fontSize: 9,
                            color: "#3b82f6",
                          }}
                        >
                          {`(${item.startDate} - ${item.endDate})`}
                        </Text>
                      )}
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </>
        )}

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <>
            <View style={styles.divider} />
            <View style={styles.section}>
              <Text style={styles.heading}>Skills</Text>
              <View style={styles.skillsContainer}>
                {data.skills.map((item: string, i: number) => (
                  <View key={i}>
                    <Text style={styles.underlinedText}>{item}</Text>
                  </View>
                ))}
              </View>
            </View>
          </>
        )}

        {/* Certifications */}
        {data.certifications && data.certifications.length > 0 && (
          <>
            <View style={styles.divider} />
            <View style={styles.section}>
              <Text style={styles.heading}>Certifications</Text>
              <View style={styles.certificationsGrid}>
                {data.certifications.map((item: any, i: number) => (
                  <View key={i} style={{ width: "48%", marginBottom: 8 }}>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.bullet}>•</Text>
                      <Text style={{ fontSize: 10, flex: 1, color: "#000" }}>
                        {item}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </>
        )}

        {/* Divider */}
        <View style={styles.divider} />

        {/* Projects */}
        <View style={styles.section}>
          <Text style={styles.heading}>Projects</Text>

          <View style={{ marginTop: 12, paddingLeft: 12 }}>
            {data.projects.map((item: any, i: number) => (
              <View key={i} style={styles.projectItem}>
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{ fontSize: 13, fontWeight: "600", marginRight: 6 }}
                  >
                    •
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: "600",
                      color: "#000",
                    }}
                  >
                    {item.name}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 10,
                    marginTop: 4,
                    color: "#000",
                    paddingLeft: 16,
                  }}
                >
                  {item.description}
                </Text>
                {(item.github || item.live) && (
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 100,
                      marginTop: 4,
                      paddingLeft: 16,
                    }}
                  >
                    {item.github && (
                      <Link src={item.github} style={styles.linkText}>
                        GitHub
                      </Link>
                    )}
                    {item.live && (
                      <Link src={item.live} style={styles.linkText}>
                        Live Demo
                      </Link>
                    )}
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Custom Section 2 */}
        {data.customSection2 && data.customSection2.length > 0 && (
          <>
            {data.customSection2.map((item: any, idx: number) => (
              <View key={idx}>
                <View style={styles.divider} />
                <View style={styles.section}>
                  <Text
                    style={[styles.heading, { textTransform: "capitalize" }]}
                  >
                    {item.title}
                  </Text>
                  <View style={styles.certificationsGrid}>
                    {item.value.map((val: any, i: number) => (
                      <View key={i} style={{ width: "48%", marginBottom: 8 }}>
                        <View style={{ flexDirection: "row" }}>
                          <Text style={styles.bullet}>•</Text>
                          <Text
                            style={{ fontSize: 10, flex: 1, color: "#000" }}
                          >
                            {val}
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            ))}
          </>
        )}
      </Page>
    </Document>
  );
}
