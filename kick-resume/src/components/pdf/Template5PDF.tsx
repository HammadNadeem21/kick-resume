// import {
//   Page,
//   Text,
//   View,
//   Document,
//   StyleSheet,
//   Link,
// } from "@react-pdf/renderer";
// import type { PageProps } from "@react-pdf/renderer";

// const styles = StyleSheet.create({
//   page: {
//     padding: 28,
//     fontSize: 12,
//     fontFamily: "Helvetica",
//     flexDirection: "column",
//     backgroundColor: "#fff",
//   },
//   section: {
//     marginBottom: 8,
//   },
//   divider: {
//     borderBottomWidth: 1,
//     borderBottomColor: "#a1a1aa",
//     marginVertical: 6,
//   },
//   heading: {
//     fontSize: 16,
//     marginBottom: 4,
//     fontWeight: "bold",
//     textAlign: "center",
//     color: "#334155",
//   },
//   subHeading: {
//     fontSize: 14,
//     fontWeight: "semibold",
//     textAlign: "center",
//     color: "#475569",
//   },
//   text: {
//     fontSize: 10,
//     color: "#1f2937",
//     lineHeight: 1,
//   },
//   summaryText: {
//     fontSize: 10,
//     color: "#1f2937",
//     lineHeight: 1.5,
//   },
//   boldText: {
//     fontWeight: "bold",
//     fontSize: 10,
//     color: "#1f2937",
//   },
//   listItem: {
//     fontSize: 10,
//     marginBottom: 2,
//   },
//   link: {
//     fontSize: 10,
//     color: "#000",
//     textDecoration: "underline",
//   },
//   flexRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   linkRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "flex-start",
//   },
//   spaceBetween: {
//     justifyContent: "space-between",
//   },
//   gap10: {
//     gap: 10,
//   },
//   gap5: {
//     gap: 5,
//   },
//   gap2: {
//     gap: 2,
//   },
//   textCenter: {
//     textAlign: "center",
//   },
//   bullet: {
//     fontSize: 10,
//     marginRight: 6,
//     marginBottom: 1,
//   },
//   projectBullet: {
//     // fontSize: 10,
//     marginRight: 6,
//     marginBottom: 1,
//   },
// });

// export default function Template5PDF({
//   data,
//   size,
// }: {
//   data: any;
//   size: PageProps["size"];
// }) {
//   return (
//     <Document>
//       <Page size={size} style={styles.page}>
//         <View style={styles.textCenter}>
//           <Text
//             style={{
//               fontSize: 24,
//               fontWeight: "bold",
//               color: "#1f2937",
//               marginBottom: 5,
//             }}
//           >
//             {data.name}
//           </Text>
//           <Text
//             style={{
//               fontSize: 18,
//               fontWeight: "semibold",
//               color: "#374151",
//               marginBottom: 10,
//             }}
//           >
//             {data.role}
//           </Text>
//         </View>

//         {data.personalInformation && data.personalInformation.length > 0 && (
//           <View
//             style={{
//               display: "flex",
//               flexDirection: "row",
//               alignItems: "flex-start",
//               justifyContent: "flex-start",
//               flexWrap: "wrap",
//               gap: 8,
//               width: "100%",
//               color: "black",
//             }}
//           >
//             {data.personalInformation.map((item: any, i: number) => (
//               <View
//                 key={i}
//                 style={{
//                   display: "flex",
//                   flexDirection: "row",
//                   alignItems: "flex-start",
//                   width: item.title.toLowerCase().includes("address")
//                     ? "100%"
//                     : "48%",
//                   color: "#000",
//                 }}
//               >
//                 <Text
//                   style={{
//                     fontSize: 10,
//                     fontWeight: "600",
//                     textTransform: "capitalize",
//                     marginRight: 4,
//                   }}
//                 >
//                   {item.title}:
//                 </Text>
//                 <Text
//                   style={{
//                     fontSize: 10,
//                     fontWeight: "400",
//                     flex: 1,
//                   }}
//                 >
//                   {item.value}
//                 </Text>
//               </View>
//             ))}
//           </View>
//         )}

//         <View style={styles.divider} />

//         {/* Summary */}
//         <View style={styles.section}>
//           <Text style={styles.heading}>Summary</Text>
//           <Text style={[styles.summaryText, { marginTop: 8 }]}>
//             {data.summary}
//           </Text>
//         </View>

//         <View style={styles.divider} />

//         {/* Experience */}
//         <View style={styles.section}>
//           <Text style={styles.heading}>Experience</Text>
//           <View style={{ marginTop: 12 }}>
//             {data.experience.map((item: any, i: number) => (
//               <View key={i} style={{ marginBottom: 12 }}>
//                 <View style={[styles.flexRow, styles.spaceBetween]}>
//                   <View>
//                     <Text style={{ fontSize: 12, fontWeight: "bold" }}>
//                       {item.companyName}
//                     </Text>
//                     <Text style={{ fontSize: 11 }}>{item.title}</Text>
//                   </View>
//                   <Text
//                     style={{ fontSize: 9 }}
//                   >{`(${item.startDate} - ${item.endDate})`}</Text>
//                 </View>
//                 <Text style={[styles.listItem, { marginTop: 4 }]}>
//                   {item.description}
//                 </Text>
//               </View>
//             ))}
//           </View>
//         </View>

//         <View style={styles.divider} />

//         {/* Education */}
//         <View style={styles.section}>
//           <Text style={styles.heading}>Education</Text>
//           <View
//             style={{
//               marginTop: 12,
//               flexDirection: "row",
//               flexWrap: "wrap",
//               justifyContent: "space-between",
//             }}
//           >
//             {data.education.map((item: any, i: number) => (
//               <View key={i} style={{ width: "48%", marginBottom: 5 }}>
//                 <Text style={styles.listItem}>• {item.degree}</Text>
//               </View>
//             ))}
//           </View>
//         </View>

//         <View style={styles.divider} />

//         {/* Skills */}
//         <View style={styles.section}>
//           <Text style={styles.heading}>Skills</Text>
//           <View
//             style={{
//               marginTop: 12,
//               flexDirection: "row",
//               alignItems: "center",
//               flexWrap: "wrap",
//             }}
//           >
//             {data.skills.map((item: string, i: number) => (
//               <View
//                 key={i}
//                 style={{
//                   flexDirection: "row",
//                   alignItems: "center",
//                   marginRight: 12,
//                   marginBottom: 5,
//                 }}
//               >
//                 <Text style={styles.bullet}>•</Text>
//                 <Text style={[styles.listItem, { marginLeft: 4 }]}>{item}</Text>
//               </View>
//             ))}
//           </View>
//         </View>

//         <View style={styles.divider} />

//         {/* Certifications */}
//         <View style={styles.section}>
//           <Text style={styles.heading}>Certifications</Text>
//           <View
//             style={{
//               marginTop: 12,
//               flexDirection: "row",
//               flexWrap: "wrap",
//               justifyContent: "space-between",
//             }}
//           >
//             {data.certifications.map((item: any, i: number) => (
//               <View
//                 key={i}
//                 style={{
//                   flexDirection: "row",
//                   alignItems: "center",
//                   marginRight: 12,
//                   marginBottom: 5,
//                 }}
//               >
//                 <Text style={styles.bullet}>•</Text>
//                 <Text style={styles.listItem}>{item}</Text>
//               </View>
//             ))}
//           </View>
//         </View>

//         <View style={styles.divider} />

//         {/* Projects */}
//         <View style={styles.section}>
//           <Text style={styles.heading}>Projects</Text>
//           <View style={{ marginTop: 12 }}>
//             {data.projects.map((item: any, i: number) => (
//               <View key={i} style={{ marginBottom: 12 }}>
//                 <View
//                   style={{
//                     flexDirection: "row",
//                     alignItems: "center",
//                     marginRight: 12,
//                     marginBottom: 5,
//                   }}
//                 >
//                   <Text style={styles.projectBullet}>•</Text>
//                   <Text style={{ fontSize: 12, fontWeight: "semibold" }}>
//                     {item.name}
//                   </Text>
//                 </View>

//                 <Text style={[styles.text, { marginTop: 4 }]}>
//                   {item.description}
//                 </Text>
//                 <View style={[styles.linkRow, styles.gap10, { marginTop: 10 }]}>
//                   {item.github && (
//                     <Link src={item.github} style={styles.link}>
//                       GitHub
//                     </Link>
//                   )}
//                   {item.live && (
//                     <Link src={item.live} style={styles.link}>
//                       Live Demo
//                     </Link>
//                   )}
//                 </View>
//               </View>
//             ))}
//           </View>
//         </View>
//       </Page>
//     </Document>
//   );
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
    padding: 20,
    fontSize: 12,
    fontFamily: "Helvetica",
    flexDirection: "column",
    backgroundColor: "#eef5ff",
  },
  section: {
    marginBottom: 10,
  },
  divider: {
    borderBottomWidth: 2,
    borderBottomColor: "#9ca3af", // gray-400
    marginTop: 8,
    marginBottom: 8,
  },
  heading: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1f2937", // gray-800
  },
  subHeading: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    color: "#374151", // gray-700
    marginBottom: 8,
  },
  text: {
    fontSize: 10,
    color: "#000",
  },
  summaryText: {
    fontSize: 10,
    color: "#000",
    fontWeight: "400",
    lineHeight: 1.5,
    marginTop: 8,
  },
  boldText: {
    fontWeight: "bold",
    fontSize: 10,
    textTransform: "capitalize",
  },
  listItem: {
    fontSize: 10,
    marginBottom: 2,
    color: "#000",
  },
  link: {
    fontSize: 10,
    color: "#000",
    textDecoration: "none",
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  spaceBetween: {
    justifyContent: "space-between",
  },
  textCenter: {
    textAlign: "center",
  },
  bullet: {
    fontSize: 10,
    marginRight: 6,
  },
  personalInfoContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 8,
    marginTop: 6,
    paddingHorizontal: 20,
  },
  personalInfoItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 4,
    fontSize: 10,
    color: "#6b7280", // gray-500
  },
  experienceItem: {
    marginBottom: 12,
    paddingLeft: 12,
  },
  projectItem: {
    marginBottom: 20,
    paddingLeft: 12,
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
    justifyContent: "center",
    gap: 20,
    marginTop: 12,
    paddingLeft: 10,
  },
  certificationsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingLeft: 20,
    marginTop: 4,
  },
});

export default function Template5PDF({
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
        <View style={styles.textCenter}>
          <Text
            style={{
              fontSize: 28,
              fontWeight: "bold",
              color: "#1f2937",
              marginBottom: 3,
            }}
          >
            {data.name}
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "600", color: "#374151" }}>
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

        {/* Divider */}
        <View style={styles.divider} />

        {/* Summary */}
        <View style={styles.section}>
          <Text style={styles.heading}>Summary</Text>
          <Text style={styles.summaryText}>{data.summary}</Text>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.heading}>Experience</Text>

            <View style={{ marginTop: 12, paddingLeft: 12 }}>
              {data.experience.map((item: any, i: number) => (
                <View key={i} style={styles.experienceItem}>
                  <View style={[styles.flexRow, styles.spaceBetween]}>
                    <View style={{ gap: 4 }}>
                      <Text
                        style={{
                          fontSize: 13,
                          fontWeight: "bold",
                          color: "#000",
                        }}
                      >
                        {item.companyName}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          color: "#000",
                          fontWeight: "400",
                        }}
                      >
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
                        fontWeight: "normal",
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
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <>
            <View style={styles.divider} />
            <View style={styles.section}>
              <Text style={styles.heading}>Education</Text>
              <View style={styles.educationGrid}>
                {data.education.map((item: any, i: number) => (
                  <View key={i} style={{ width: "48%", marginBottom: 8 }}>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.bullet}>•</Text>
                      <Text style={{ fontSize: 11, flex: 1, color: "#000" }}>
                        {item.degree}
                      </Text>
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
                  <View
                    key={i}
                    style={{ flexDirection: "row", alignItems: "center" }}
                  >
                    <Text style={styles.bullet}>•</Text>
                    <Text style={{ fontSize: 11, color: "#000" }}>{item}</Text>
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
                      <Text style={{ fontSize: 11, flex: 1, color: "#000" }}>
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
                  <Text style={styles.bullet}>•</Text>
                  <Text
                    style={{ fontSize: 13, fontWeight: "600", color: "#000" }}
                  >
                    {item.name}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 10,
                    marginTop: 4,
                    color: "#000",
                    fontWeight: "normal",
                    lineHeight: 1.5,
                    paddingLeft: 10,
                  }}
                >
                  {item.description}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 100,
                    marginTop: 4,
                    paddingLeft: 10,
                  }}
                >
                  <Link src={item.github} style={styles.link}>
                    GitHub
                  </Link>

                  <Link src={item.live} style={styles.link}>
                    Live Demo
                  </Link>
                </View>
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
                  <View style={{ marginTop: 8, paddingLeft: 12 }}>
                    {item.value.map((val: any, i: number) => (
                      <View
                        key={i}
                        style={{ flexDirection: "row", marginBottom: 4 }}
                      >
                        <Text style={styles.bullet}>•</Text>
                        <Text style={{ fontSize: 11, flex: 1, color: "#000" }}>
                          {val}
                        </Text>
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
