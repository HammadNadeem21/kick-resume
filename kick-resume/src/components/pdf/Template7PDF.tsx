import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Link,
  Image,
} from "@react-pdf/renderer";
import type { PageProps } from "@react-pdf/renderer";

const LEFT_BG = "#e9eef6";
const RIGHT_BG = "#7b7266";
const DARK_TEXT = "#222";
const WHITE = "#fff";

const styles = StyleSheet.create({
  page: {
    backgroundColor: LEFT_BG,
    fontSize: 12,
    fontFamily: "Helvetica",
    color: DARK_TEXT,
    padding: 0,
  },
  mainGrid: {
    flexDirection: "row",
    width: "100%",
    minHeight: "100%",
  },
  leftCol: {
    width: "65%",
    backgroundColor: LEFT_BG,
    paddingVertical: 24,
    paddingHorizontal: 28,
    color: DARK_TEXT,
  },
  rightCol: {
    width: "35%",
    // backgroundColor: RIGHT_BG,
    paddingVertical: 24,
    paddingHorizontal: 16,
    color: WHITE,
    alignItems: "center",
  },
  imageWrapper: {
    marginTop: 8,
    marginBottom: 24,
    width: 150,
    height: 150,
    borderRadius: 75,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: "#bdbdbd",
  },
  sectionTitleLeft: {
    fontSize: 15,
    fontWeight: "bold",
    color: DARK_TEXT,
    marginTop: 18,
    marginBottom: 8,
    textAlign: "left",
  },
  sectionTitleRight: {
    fontSize: 14,
    fontWeight: "bold",
    color: WHITE,
    marginTop: 18,
    marginBottom: 8,
    textAlign: "left",
    width: "100%",
  },
  dividerLeft: {
    height: 1,
    backgroundColor: "#bdbdbd",
    marginVertical: 16,
    width: "100%",
  },
  dividerRight: {
    height: 1,
    backgroundColor: WHITE,
    marginVertical: 16,
    width: "100%",
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    color: DARK_TEXT,
    marginBottom: 2,
  },
  role: {
    fontSize: 16,
    fontWeight: "bold",
    color: DARK_TEXT,
    marginBottom: 12,
  },
  contactBlock: {
    marginBottom: 8,
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  contactLabel: {
    fontWeight: "bold",
    marginRight: 4,
    color: DARK_TEXT,
    fontSize: 12,
    minWidth: 55,
  },
  contactValue: {
    color: DARK_TEXT,
    fontSize: 12,
  },
  summary: {
    fontSize: 12,
    color: DARK_TEXT,
    marginBottom: 10,
    marginTop: 2,
    lineHeight: 1.5,
  },
  expBlock: {
    marginBottom: 12,
  },
  expCompany: {
    fontWeight: "bold",
    fontSize: 12,
    color: DARK_TEXT,
    marginRight: 6,
  },
  expRole: {
    fontWeight: "bold",
    fontSize: 11,
    color: DARK_TEXT,
    marginRight: 6,
  },
  expDates: {
    fontSize: 10,
    color: "#888",
    marginLeft: 2,
  },
  expDesc: {
    fontSize: 11,
    color: DARK_TEXT,
    marginTop: 2,
    marginBottom: 2,
    lineHeight: 1.4,
  },
  projectBlock: {
    marginBottom: 14,
  },
  projectName: {
    fontWeight: "bold",
    fontSize: 13,
    color: DARK_TEXT,
    marginBottom: 2,
  },
  projectDesc: {
    fontSize: 11,
    color: DARK_TEXT,
    marginBottom: 2,
  },
  projectLinks: {
    flexDirection: "row",
    gap: 32,
    marginTop: 2,
  },
  projectLink: {
    fontSize: 11,
    color: DARK_TEXT,
    textDecoration: "underline",
    marginRight: 24,
  },
  list: {
    marginBottom: 10,
    paddingLeft: 12,
    width: "100%",
  },
  listItemRight: {
    color: WHITE,
    fontSize: 12,
    marginBottom: 4,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  bullet: {
    color: WHITE,
    marginRight: 6,
    fontSize: 14,
    marginTop: -1,
  },
});

export default function Template7PDF({
  data,
  imageUrl,
  imageBgColor,
  color,
  size,
}: {
  data: any;
  imageUrl: string;
  imageBgColor?: string;
  color: any;
  size: PageProps["size"];
}) {
  return (
    <Document>
      <Page size={size} style={styles.page}>
        <View style={styles.mainGrid}>
          {/* Left Column */}
          <View style={styles.leftCol}>
            {/* Name & Role */}
            <Text style={styles.name}>{data.name}</Text>
            <Text style={styles.role}>{data.role}</Text>
            {/* Contact Info */}
            <View style={styles.contactBlock}>
              <View style={styles.contactRow}>
                <Text style={styles.contactLabel}>Phone:</Text>
                <Text style={styles.contactValue}>+{data.phone || ""}</Text>
              </View>
              <View style={styles.contactRow}>
                <Text style={styles.contactLabel}>Email:</Text>
                <Text style={styles.contactValue}>{data.email || ""}</Text>
              </View>
              <View style={styles.contactRow}>
                <Text style={styles.contactLabel}>Address:</Text>
                <Text style={styles.contactValue}>{data.address || ""}</Text>
              </View>
            </View>
            <View style={styles.dividerLeft} />
            {/* Summary */}
            <Text style={styles.sectionTitleLeft}>Summary</Text>
            <Text style={styles.summary}>{data.summary}</Text>
            <View style={styles.dividerLeft} />
            {/* Experience */}
            <Text style={styles.sectionTitleLeft}>Experience</Text>
            {data.experience?.map((item: any, i: number) => (
              <View key={i} style={styles.expBlock}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <Text style={styles.expCompany}>{item.companyName}</Text>
                  <Text style={styles.expRole}>{item.title}</Text>
                  <Text style={styles.expDates}>
                    ({item.startDate}{" "}
                    {item.endDate && item.endDate !== "Currently working"
                      ? ` ${item.endDate}`
                      : item.endDate}
                    )
                  </Text>
                </View>
                <Text style={styles.expDesc}>{item.description}</Text>
              </View>
            ))}
            <View style={styles.dividerLeft} />
            {/* Projects */}
            <Text style={styles.sectionTitleLeft}>Projects</Text>
            {data.projects?.map((item: any, i: number) => (
              <View key={i} style={styles.projectBlock}>
                <Text style={styles.projectName}>{item.name}</Text>
                <Text style={styles.projectDesc}>{item.description}</Text>
                <View style={styles.projectLinks}>
                  <Link
                    style={styles.projectLink}
                    src={item.github || "/aiprompt"}
                  >
                    GitHub
                  </Link>
                  <Link
                    style={styles.projectLink}
                    src={item.live || "/aiprompt"}
                  >
                    live demo
                  </Link>
                </View>
              </View>
            ))}
          </View>

          {/* Right Column */}
          <View
            style={{
              ...styles.rightCol,
              backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, 1)`,
            }}
          >
            {/* Image */}
            <View
              style={{
                ...styles.imageWrapper,
                backgroundColor:
                  imageBgColor || styles.imageWrapper.backgroundColor,
              }}
            >
              {imageUrl ? (
                // eslint-disable-next-line jsx-a11y/alt-text
                <Image
                  src={imageUrl}
                  style={{
                    width: 150,
                    height: 150,
                    borderRadius: 75,
                    objectFit: "cover",
                  }}
                />
              ) : (
                <View
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: 60,
                    backgroundColor: "#eee",
                  }}
                />
              )}
            </View>
            {/* Education */}
            {data.education?.length > 0 && (
              <>
                <Text style={styles.sectionTitleRight}>Education</Text>
                <View style={styles.list}>
                  {data.education.map((item: any, i: number) => (
                    <View key={i} style={styles.listItemRight}>
                      <Text style={styles.bullet}>•</Text>
                      <Text>{item.degree}</Text>
                    </View>
                  ))}
                </View>
                <View style={styles.dividerRight} />
              </>
            )}
            {/* Skills */}
            {data.skills?.length > 0 && (
              <>
                <Text style={styles.sectionTitleRight}>Skills</Text>
                <View style={styles.list}>
                  {data.skills.map((item: any, i: number) => (
                    <View key={i} style={styles.listItemRight}>
                      <Text style={styles.bullet}>•</Text>
                      <Text>{item}</Text>
                    </View>
                  ))}
                </View>
                <View style={styles.dividerRight} />
              </>
            )}
            {/* Languages */}
            {data.languages?.length > 0 && (
              <>
                <Text style={styles.sectionTitleRight}>Languages</Text>
                <View style={styles.list}>
                  {data.languages.map((item: any, i: number) => (
                    <View key={i} style={styles.listItemRight}>
                      <Text style={styles.bullet}>•</Text>
                      <Text>{item}</Text>
                    </View>
                  ))}
                </View>
                <View style={styles.dividerRight} />
              </>
            )}
            {/* Certifications */}
            {data.certifications?.length > 0 && (
              <>
                <Text style={styles.sectionTitleRight}>Certifications</Text>
                <View style={styles.list}>
                  {data.certifications.map((item: any, i: number) => (
                    <View key={i} style={styles.listItemRight}>
                      <Text style={styles.bullet}>•</Text>
                      <Text>{item}</Text>
                    </View>
                  ))}
                </View>
              </>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
}
